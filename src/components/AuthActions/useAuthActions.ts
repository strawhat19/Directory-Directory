import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'expo-router';
import { useAuth } from '../../shared/auth/useAuth';
import { getAuthRedirect } from '../../shared/auth/redirects';
import { authRoutes } from '../../shared/navigation/authRoutes';

export const authLinks = [
  { id: `sign-in`, label: authRoutes.signIn.label, icon: authRoutes.signIn.icon, pathname: authRoutes.signIn.href },
  { id: `sign-up`, label: authRoutes.signUp.label, icon: authRoutes.signUp.icon, pathname: authRoutes.signUp.href },
] as const;

export function useAuthActions() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, ready, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(``);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setOpen(false);
    setError(``);
  }, [pathname, user?.email]);

  const closeMenu = () => setOpen(false);
  const toggleMenu = () => setOpen((current) => !current);

  const handleSignOut = async () => {
    if (busy) return;
    setError(``);
    setBusy(true);

    try {
      await signOut();
      closeMenu();
      router.replace(`/`);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : `Please try signing out again.`);
    } finally {
      setBusy(false);
    }
  };

  return {
    user,
    open,
    ready,
    error,
    busy,
    setOpen,
    closeMenu,
    toggleMenu,
    handleSignOut,
    profileRoute: authRoutes.profile,
    avatarColor: user?.color?.color ?? `#0874f9`,
    avatarInitial: (user?.name?.trim()?.[0] || `U`).toUpperCase(),
    avatarTextColor: user?.color?.type === `light` ? `#14213d` : `#ffffff`,
    redirect: getAuthRedirect(pathname),
  };
}
