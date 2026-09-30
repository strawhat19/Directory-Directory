import { useMemo } from 'react';
import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import type { AuthActionsProps } from './AuthActions.types';
import { authLinks, useAuthActions } from './useAuthActions';
import { useTheme } from '../../shared/theme/useTheme';
import { elementProps } from '../../shared/ui/elementProps';
import { getNativePalette } from '../../shared/theme/nativePalette';
import { createAuthActionsStyles } from './AuthActions.native.styles';

export default function AuthActions({ scope }: AuthActionsProps) {
  const { isDark } = useTheme();
  const palette = getNativePalette(isDark);
  const styles = useMemo(() => createAuthActionsStyles(isDark), [isDark]);
  const { user, ready, error, busy, redirect, handleSignOut } = useAuthActions();

  return (
    <View {...elementProps(`auth-actions`, scope)} style={styles.actions}>
      {ready && user ? (
        <>
          <Text
            numberOfLines={1}
            style={styles.name}
            {...elementProps(`auth-actions-name`, scope)}
          >
            {user.name}
          </Text>
          <Pressable
            disabled={busy}
            onPress={handleSignOut}
            accessibilityRole={`button`}
            {...elementProps(`auth-actions-sign-out`, scope)}
            style={({ pressed }) => [styles.button, (pressed || busy) && styles.pressed]}
          >
            <Icon name={`log-out`} color={palette.blue} id={`${scope}-sign-out-icon`} size={15} />
            <Text style={styles.label} {...elementProps(`auth-actions-sign-out-label`, scope)}>
              {busy ? `Signing out…` : `Sign out`}
            </Text>
          </Pressable>
        </>
      ) : authLinks.map((link) => (
        <Link
          asChild
          key={link.id}
          href={{ pathname: link.pathname, params: { redirect } }}
        >
          <Pressable
            accessibilityRole={`link`}
            {...elementProps(`auth-actions-link`, `${scope}-${link.id}`)}
            style={({ pressed }) => [
              styles.button,
              link.id === `sign-up` && styles.primary,
              pressed && styles.pressed,
            ]}
          >
            <Icon
              size={15}
              name={link.icon}
              id={`${scope}-${link.id}-icon`}
              color={link.id === `sign-up` ? palette.white : palette.blue}
            />
            <Text
              {...elementProps(`auth-actions-label`, `${scope}-${link.id}`)}
              style={[styles.label, link.id === `sign-up` && styles.white]}
            >
              {link.label}
            </Text>
          </Pressable>
        </Link>
      ))}
      {error && (
        <Text
          style={styles.error}
          accessibilityLiveRegion={`polite`}
          {...elementProps(`auth-actions-error`, scope)}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
