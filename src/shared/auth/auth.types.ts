export type DemoUser = {
  id: string;
  name: string;
  email: string;
  number: number;
  created: string;
  updated: string;
  role: `Subscriber`;
  photoURL?: string;
  publicSharing: boolean;
  profilePrivacy: `private` | `public`;
  color?: { color: string; type: `dark` | `light` };
};

export type AuthData = {
  version: 2;
  nextNumber: number;
  profiles: DemoUser[];
};

export type PasswordCredential = {
  salt: string;
  hash: string;
  iterations: number;
  algorithm: `PBKDF2-SHA256`;
};

export type AccountCredential = {
  version: 1;
  userId: string;
  sessionTokenHash?: string;
  password: PasswordCredential;
};

export type AuthSession = {
  version: 1;
  token: string;
  userId: string;
  expiresAt: number;
};

export type AuthenticationResult = {
  user: DemoUser;
  expiresAt: number;
};

export const authStorageKey = `directory-directory.demo-auth.v2`;
export const legacyAuthStorageKey = `directory-directory.demo-auth.v1`;
export const sessionStorageKey = `directory-directory.demo-session.v1`;
export const credentialStoragePrefix = `directory-directory.demo-credential.v1:`;
export const emptyAuthData: AuthData = { version: 2, profiles: [], nextNumber: 1 };
export const credentialStorageKey = (userId: string) => `${credentialStoragePrefix}${userId}`;

const parseSavedValue = (value: string): unknown => {
  try {
    return JSON.parse(value);
  } catch {
    throw new Error(`Saved Accounts Could Not Be Read`);
  }
};

export function parseAuthData(value: string | null): AuthData {
  if (value === null) return { ...emptyAuthData, profiles: [] };

  const parsed = parseSavedValue(value) as Partial<AuthData> | null;
  if (parsed?.version !== 2 || !Array.isArray(parsed.profiles)
    || !Number.isSafeInteger(parsed.nextNumber) || Number(parsed.nextNumber) < 1) {
    throw new Error(`Saved Accounts Have An Unsupported Format`);
  }

  const ids = new Set<string>();
  const emails = new Set<string>();
  const numbers = new Set<number>();
  const profiles = parsed.profiles.map((profile): DemoUser => {
    if (!profile || typeof profile.id !== `string` || !profile.id.startsWith(`User_${profile.number}_`)
      || !Number.isSafeInteger(profile.number) || profile.number < 1 || typeof profile.name !== `string`
      || !profile.name.trim() || typeof profile.email !== `string` || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)
      || typeof profile.created !== `string` || typeof profile.updated !== `string` || profile.role !== `Subscriber`
      || ![`private`, `public`].includes(profile.profilePrivacy) || typeof profile.publicSharing !== `boolean`
      || (profile.photoURL !== undefined && (typeof profile.photoURL !== `string` || !/^https:\/\//i.test(profile.photoURL)))
      || (profile.color !== undefined && (!profile.color || typeof profile.color.color !== `string`
        || !/^#[a-f\d]{6}$/i.test(profile.color.color) || ![`dark`, `light`].includes(profile.color.type)))) {
      throw new Error(`Saved Account Data Is Incomplete`);
    }

    const email = profile.email.trim().toLowerCase();
    if (ids.has(profile.id) || emails.has(email) || numbers.has(profile.number)) {
      throw new Error(`Saved Accounts Contain Duplicate Records`);
    }

    ids.add(profile.id);
    emails.add(email);
    numbers.add(profile.number);

    return {
      email,
      id: profile.id,
      name: profile.name,
      number: profile.number,
      role: `Subscriber`,
      created: profile.created,
      updated: profile.updated,
      photoURL: profile.photoURL,
      publicSharing: profile.publicSharing,
      profilePrivacy: profile.profilePrivacy,
      color: profile.color ? { ...profile.color } : undefined,
    };
  });

  return {
    profiles,
    version: 2,
    nextNumber: Math.max(Number(parsed.nextNumber), ...profiles.map((profile) => profile.number + 1)),
  };
}

export function parseLegacyProfiles(value: string): Pick<DemoUser, `name` | `email`>[] {
  const parsed = parseSavedValue(value) as { profiles?: unknown } | null;
  const profiles = parsed?.profiles;
  if (!Array.isArray(profiles)) throw new Error(`Saved Accounts Have An Unsupported Format`);

  const emails = new Set<string>();
  return profiles.map((value) => {
    const profile = value as { name?: unknown; email?: unknown } | null;
    if (typeof profile?.name !== `string` || !profile.name.trim() || typeof profile.email !== `string`
      || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      throw new Error(`Saved Account Data Is Incomplete`);
    }

    const email = profile.email.trim().toLowerCase();
    if (emails.has(email)) throw new Error(`Saved Accounts Contain Duplicate Records`);
    emails.add(email);
    return { email, name: profile.name };
  });
}
