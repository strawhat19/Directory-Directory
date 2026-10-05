import { createUserId } from './userIds';
import { useLocalStorage } from '../storage/storageConfig';
import { readStorage, writeStorage, removeStorage } from './authStorage';
import type { AuthData, AuthSession, DemoUser, AccountCredential, AuthenticationResult } from './auth.types';
import { secureRandomHex, sessionTokenHash, verifyPassword, verifySessionToken, isPasswordCredential, createPasswordCredential } from './password';
import { authStorageKey, parseAuthData, parseLegacyProfiles, sessionStorageKey, credentialStorageKey, legacyAuthStorageKey } from './auth.types';

const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000;
const avatarColors = [`#059669`, `#2563eb`, `#7c3aed`, `#b45309`, `#be185d`];
let operationQueue: Promise<unknown> = Promise.resolve();

const runOperation = <T,>(operation: () => Promise<T>): Promise<T> => {
  const run = () => typeof navigator !== `undefined` && navigator.locks?.request
    ? navigator.locks.request(authStorageKey, operation)
    : operation();
  const result = operationQueue.then(run, run);
  operationQueue = result.then(() => undefined, () => undefined);
  return result;
};

const requireLocalAuthentication = () => {
  if (!useLocalStorage) throw new Error(`Connect A Backend To Use Authentication`);
};

const normalizeEmail = (value: string) => {
  const email = value?.trim()?.toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error(`Enter A Valid Email Address`);
  return email;
};

const validatePassword = (password: string) => {
  if (typeof password !== `string` || !password) throw new Error(`Enter A Password`);
};

const createProfile = async (name: string, email: string, number: number): Promise<DemoUser> => {
  const now = new Date().toISOString();
  const id = await createUserId(number, name, now);

  return {
    id,
    name,
    email,
    number,
    created: now,
    updated: now,
    role: `Subscriber`,
    publicSharing: false,
    profilePrivacy: `private`,
    color: { type: `dark`, color: avatarColors[(number - 1) % avatarColors.length]! },
  };
};

const readProfiles = async (): Promise<AuthData> => {
  const stored = await readStorage(authStorageKey);
  if (stored !== null) return parseAuthData(stored);

  const legacy = await readStorage(legacyAuthStorageKey);
  if (legacy === null) return parseAuthData(null);

  const profiles: DemoUser[] = [];
  for (const profile of parseLegacyProfiles(legacy)) {
    profiles.push(await createProfile(profile.name, profile.email, profiles.length + 1));
  }

  const data: AuthData = { profiles, version: 2, nextNumber: profiles.length + 1 };
  await writeStorage(authStorageKey, JSON.stringify(data));
  await removeStorage(legacyAuthStorageKey);
  return data;
};

const readCredential = async (userId: string): Promise<AccountCredential | null> => {
  const stored = await readStorage(credentialStorageKey(userId));
  if (stored === null) return null;

  let credential: AccountCredential;
  try {
    credential = JSON.parse(stored) as AccountCredential;
  } catch {
    throw new Error(`Saved Account Credentials Could Not Be Read`);
  }

  if (credential?.version !== 1 || credential.userId !== userId || !isPasswordCredential(credential.password)
    || (credential.sessionTokenHash !== undefined && (typeof credential.sessionTokenHash !== `string`
      || !/^[a-f0-9]{64}$/.test(credential.sessionTokenHash)))) {
    throw new Error(`Saved Account Credentials Are Unavailable`);
  }

  return credential;
};

const writeCredential = (credential: AccountCredential) => writeStorage(credentialStorageKey(credential.userId), JSON.stringify(credential));

const readSession = async (): Promise<AuthSession | null> => {
  const stored = await readStorage(sessionStorageKey);
  if (stored === null) return null;

  let session: AuthSession | null = null;
  try {
    session = JSON.parse(stored) as AuthSession;
  } catch {
    // Invalid sessions can be revoked without changing the saved account collection.
  }

  if (session?.version === 1 && typeof session.userId === `string` && typeof session.token === `string`
    && /^[a-f0-9]{64}$/.test(session.token) && Number.isFinite(session.expiresAt) && session.expiresAt > Date.now()) {
    return session;
  }

  await removeStorage(sessionStorageKey);
  return null;
};

const beginSession = async (data: AuthData, user: DemoUser, credential: AccountCredential): Promise<AuthenticationResult> => {
  const token = await secureRandomHex();
  const expiresAt = Date.now() + SESSION_DURATION;
  const session: AuthSession = { token, expiresAt, version: 1, userId: user.id };
  const profile = { ...user, updated: new Date().toISOString() };

  await writeStorage(authStorageKey, JSON.stringify({ ...data, profiles: data.profiles.map((item) => item.id === user.id ? profile : item) }));
  await writeCredential({ ...credential, sessionTokenHash: sessionTokenHash(token) });
  await writeStorage(sessionStorageKey, JSON.stringify(session));
  return { expiresAt, user: profile };
};

export const signUp = (nameValue: string, emailValue: string, password: string): Promise<AuthenticationResult> => runOperation(async () => {
  requireLocalAuthentication();
  const email = normalizeEmail(emailValue);
  const name = nameValue?.trim()?.replace(/\s+/g, ` `);
  if (!name || name.length > 100) throw new Error(`Enter A Name Of 1 To 100 Characters`);
  validatePassword(password);

  const data = await readProfiles();
  const existing = data.profiles.find((profile) => profile.email === email);
  if (existing && await readCredential(existing.id)) throw new Error(`An Account Already Uses This Email. Sign In Instead`);

  const user = existing ? { ...existing, name } : await createProfile(name, email, data.nextNumber);
  const credential: AccountCredential = { version: 1, userId: user.id, password: await createPasswordCredential(password) };
  if (!existing) {
    data.profiles.push(user);
    data.nextNumber = user.number + 1;
  }

  return beginSession(data, user, credential);
});

export const signIn = (emailValue: string, password: string): Promise<AuthenticationResult> => runOperation(async () => {
  requireLocalAuthentication();
  const email = normalizeEmail(emailValue);
  validatePassword(password);

  const data = await readProfiles();
  const user = data.profiles.find((profile) => profile.email === email);
  const credential = user ? await readCredential(user.id) : null;
  if (user && !credential) throw new Error(`Finish Setting Up This Saved Account With Sign Up`);
  if (!user || !credential || !await verifyPassword(password, credential.password)) throw new Error(`Email Or Password Is Incorrect`);

  return beginSession(data, user, credential);
});

export const restoreSession = (): Promise<AuthenticationResult | null> => runOperation(async () => {
  if (!useLocalStorage) return null;

  const data = await readProfiles();
  const session = await readSession();
  if (!session) return null;

  const user = data.profiles.find((profile) => profile.id === session.userId);
  const credential = user ? await readCredential(user.id) : null;
  if (!user || !credential?.sessionTokenHash || !verifySessionToken(session.token, credential.sessionTokenHash)) {
    await removeStorage(sessionStorageKey);
    return null;
  }

  return { user, expiresAt: session.expiresAt };
});

export const signOut = (): Promise<void> => runOperation(async () => {
  if (!useLocalStorage) return;

  try {
    const session = await readSession();
    const credential = session ? await readCredential(session.userId) : null;
    if (credential?.sessionTokenHash) {
      delete credential.sessionTokenHash;
      await writeCredential(credential);
    }
  } finally {
    await removeStorage(sessionStorageKey);
  }
});
