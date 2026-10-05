import { useAuth } from '../../shared/auth/useAuth';
import { authRoutes } from '../../shared/navigation/authRoutes';

export function useProfilePage() {
  const { user, ready } = useAuth();

  return {
    ready,
    profileRoute: authRoutes.profile,
    user: user?.role === authRoutes.profile.minimumRole ? user : null,
    initial: (user?.name?.trim()?.[0] || `U`).toUpperCase(),
    avatarColor: user?.color?.color ?? `#0874f9`,
    avatarTextColor: user?.color?.type === `light` ? `#14213d` : `#ffffff`,
  };
}
