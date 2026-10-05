import {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
  createContext,
  type PropsWithChildren,
} from 'react';
import { AppState } from 'react-native';
import { authAPI } from '../../api/auth';
import { useLocalStorage } from '../storage/storageConfig';
import type { DemoUser, AuthenticationResult } from './auth.types';
import { authStorageKey, legacyAuthStorageKey, sessionStorageKey, credentialStoragePrefix } from './auth.types';

type AuthContextValue = {
  busy: boolean;
  ready: boolean;
  error: string | null;
  user: DemoUser | null;
  clearError: () => void;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const errorMessage = (failure: unknown) => failure instanceof Error ? failure.message : `Authentication Is Unavailable`;

export function AuthProvider({ children }: PropsWithChildren) {
  const mounted = useRef(false);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<DemoUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);

  const applySession = useCallback((result: AuthenticationResult | null) => {
    if (!mounted.current) return;
    setUser(result?.user ?? null);
    setExpiresAt(result?.expiresAt ?? null);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      applySession(await authAPI.restoreSession());
      if (mounted.current) setError(null);
    } catch (failure) {
      applySession(null);
      if (mounted.current) setError(errorMessage(failure));
      throw failure;
    } finally {
      if (mounted.current) setReady(true);
    }
  }, [applySession]);

  useEffect(() => {
    mounted.current = true;
    void refreshUser().catch(() => undefined);

    const resumeSession = () => { void refreshUser().catch(() => undefined); };
    const syncSession = (event: StorageEvent) => {
      if (event.key === null || [authStorageKey, legacyAuthStorageKey, sessionStorageKey].includes(event.key)
        || event.key.startsWith(credentialStoragePrefix)) {
        resumeSession();
      }
    };
    const subscription = AppState.addEventListener(`change`, (state) => {
      if (state === `active`) resumeSession();
    });

    if (useLocalStorage && typeof window !== `undefined`) {
      window.addEventListener(`focus`, resumeSession);
      window.addEventListener(`storage`, syncSession);
    }

    return () => {
      mounted.current = false;
      subscription.remove();
      if (typeof window !== `undefined`) {
        window.removeEventListener(`focus`, resumeSession);
        window.removeEventListener(`storage`, syncSession);
      }
    };
  }, [refreshUser]);

  useEffect(() => {
    if (!user || expiresAt === null) return;

    let timer: ReturnType<typeof setTimeout>;
    const scheduleExpiry = () => {
      const remaining = expiresAt - Date.now();
      if (remaining <= 0) {
        void refreshUser().catch(() => undefined);
        return;
      }

      timer = setTimeout(scheduleExpiry, Math.min(remaining, 2_147_483_647));
    };

    scheduleExpiry();
    return () => clearTimeout(timer);
  }, [user?.id, expiresAt, refreshUser]);

  const authenticate = useCallback(async (operation: () => Promise<AuthenticationResult>) => {
    if (!ready) throw new Error(`Please Wait While Your Saved Account Loads`);
    setBusy(true);
    setError(null);

    try {
      applySession(await operation());
    } catch (failure) {
      if (mounted.current) setError(errorMessage(failure));
      throw failure;
    } finally {
      if (mounted.current) setBusy(false);
    }
  }, [ready, applySession]);

  const signIn = useCallback((email: string, password: string) => authenticate(() => authAPI.signIn(email, password)), [authenticate]);
  const signUp = useCallback((name: string, email: string, password: string) => authenticate(() => authAPI.signUp(name, email, password)), [authenticate]);

  const signOut = useCallback(async () => {
    setBusy(true);
    setError(null);

    try {
      await authAPI.signOut();
    } catch (failure) {
      if (mounted.current) setError(errorMessage(failure));
      throw failure;
    } finally {
      applySession(null);
      if (mounted.current) setBusy(false);
    }
  }, [applySession]);

  const clearError = useCallback(() => setError(null), []);
  const value = useMemo(() => ({ busy, ready, user, error, signIn, signUp, signOut, clearError, refreshUser }), [busy, ready, user, error, signIn, signUp, signOut, clearError, refreshUser]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
