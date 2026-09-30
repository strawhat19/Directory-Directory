import { useState } from 'react';
import { usePathname } from 'expo-router';
import { useAuth } from '../../shared/auth/useAuth';
import { getAuthRedirect } from '../../shared/auth/redirects';

export const authLinks = [
  { id: `sign-in`, label: `Sign In`, icon: `log-in`, pathname: `/sign-in` },
  { id: `sign-up`, label: `Sign Up`, icon: `user-plus`, pathname: `/sign-up` },
] as const;

export function useAuthActions() {
  const pathname = usePathname();
  const { user, ready, signOut } = useAuth();
  const [error, setError] = useState(``);
  const [busy, setBusy] = useState(false);

  const handleSignOut = async () => {
    if (busy) return;
    setError(``);
    setBusy(true);

    try {
      await signOut();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : `Please try signing out again.`);
    } finally {
      setBusy(false);
    }
  };

  return { user, ready, error, busy, handleSignOut, redirect: getAuthRedirect(pathname) };
}
