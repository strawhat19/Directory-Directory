import {
  useMemo,
  useState,
  useEffect,
  useCallback,
  createContext,
  type PropsWithChildren,
} from 'react';
import { readAuthData, writeAuthData } from './authStorage';
import { emptyAuthData, type AuthData, type DemoUser } from './auth.types';

type AuthContextValue = {
  ready: boolean;
  user: DemoUser | null;
  signOut: () => Promise<void>;
  signIn: (email: string) => Promise<void>;
  signUp: (name: string, email: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function normalizeEmail(value: string) {
  const email = value.trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error(`Enter a valid email address.`);
  }

  return email;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [ready, setReady] = useState(false);
  const [data, setData] = useState<AuthData>(emptyAuthData);

  useEffect(() => {
    let active = true;

    readAuthData()
      .then((stored) => {
        if (active) setData(stored);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setReady(true);
      });

    return () => { active = false; };
  }, []);

  const save = useCallback(async (next: AuthData) => {
    if (!ready) throw new Error(`Please wait while your local profiles load.`);

    try {
      await writeAuthData(next);
    } catch {
      throw new Error(`Local storage is unavailable. Enable storage for this app and try again.`);
    }

    setData(next);
  }, [ready]);

  const signIn = useCallback(async (value: string) => {
    const email = normalizeEmail(value);

    if (!data.profiles.some((profile) => profile.email === email)) {
      throw new Error(`No local profile matches that email. Sign up on this device first.`);
    }

    await save({ ...data, sessionEmail: email });
  }, [data, save]);

  const signUp = useCallback(async (value: string, address: string) => {
    const name = value.trim();
    const email = normalizeEmail(address);

    if (!name) throw new Error(`Enter your name.`);
    if (data.profiles.some((profile) => profile.email === email)) {
      throw new Error(`A local profile already uses that email. Sign in instead.`);
    }

    await save({
      sessionEmail: email,
      profiles: [...data.profiles, { name, email }],
    });
  }, [data, save]);

  const signOut = useCallback(async () => {
    await save({ ...data, sessionEmail: null });
  }, [data, save]);

  const user = data.profiles.find((profile) => profile.email === data.sessionEmail) ?? null;
  const value = useMemo(() => ({ ready, user, signIn, signUp, signOut }), [ready, user, signIn, signUp, signOut]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
