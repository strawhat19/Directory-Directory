import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import type { AuthActionsProps } from './AuthActions.types';
import { authLinks, useAuthActions } from './useAuthActions';
import { useTheme } from '../../shared/theme/useTheme';
import { elementProps } from '../../shared/ui/elementProps';
import { getNativePalette } from '../../shared/theme/nativePalette';
import { createAuthActionsStyles } from './AuthActions.native.styles';
import { useSearchAccent } from '../../shared/landing/useSearchAccent';
import { Image, Modal, Pressable, Text, View, useWindowDimensions } from 'react-native';

export default function AuthActions({ scope }: AuthActionsProps) {
  const { isDark } = useTheme();
  const accent = useSearchAccent();
  const state = useAuthActions();
  const { width, height } = useWindowDimensions();
  const trigger = useRef<View>(null);
  const [anchor, setAnchor] = useState({ top: 80, right: 16 });
  const palette = getNativePalette(isDark, accent);
  const styles = useMemo(() => createAuthActionsStyles(isDark, accent), [isDark, accent]);
  const { user, ready, error, busy } = state;
  const darkHeaderSignIn = isDark && scope.includes(`header`);

  const toggleMenu = () => {
    if (state.open) {
      state.closeMenu();
      return;
    }

    trigger.current?.measureInWindow((x, y, buttonWidth, buttonHeight) => {
      setAnchor({
        right: Math.max(16, width - x - buttonWidth),
        top: Math.max(16, Math.min(y + buttonHeight + 10, height - 296)),
      });
    });
    state.setOpen(true);
  };

  return (
    <View {...elementProps(`auth-actions`, scope)} style={styles.actions}>
      {!ready ? (
        <View
          style={styles.skeleton}
          accessibilityLabel={`Loading account`}
          {...elementProps(`auth-actions-loading`, scope)}
        />
      ) : user ? (
        <>
          <Pressable
            ref={trigger}
            disabled={busy}
            onPress={toggleMenu}
            accessibilityRole={`button`}
            accessibilityLabel={`${user.name} account menu`}
            accessibilityState={{ expanded: state.open, disabled: busy }}
            {...elementProps(`auth-actions-avatar-button`, scope)}
            style={({ pressed }) => [styles.avatarButton, (pressed || busy) && styles.pressed]}
          >
            {user.photoURL ? (
              <Image
                style={styles.avatar}
                source={{ uri: user.photoURL }}
                accessibilityLabel={user.name}
                {...elementProps(`auth-actions-avatar`, scope)}
              />
            ) : (
              <View
                {...elementProps(`auth-actions-avatar`, scope)}
                style={[styles.avatar, { backgroundColor: state.avatarColor }]}
              >
                <Text
                  {...elementProps(`auth-actions-avatar-initial`, scope)}
                  style={[styles.initial, { color: state.avatarTextColor }]}
                >
                  {state.avatarInitial}
                </Text>
              </View>
            )}
          </Pressable>
          <Modal
            transparent
            animationType={`fade`}
            visible={state.open}
            onRequestClose={state.closeMenu}
            {...elementProps(`auth-actions-menu-modal`, scope)}
          >
            <View {...elementProps(`auth-actions-menu-layer`, scope)} style={styles.menuLayer}>
              <Pressable
                style={styles.dismiss}
                onPress={state.closeMenu}
                accessibilityRole={`button`}
                accessibilityLabel={`Close account menu`}
                {...elementProps(`auth-actions-menu-dismiss`, scope)}
              />
              <View
                accessibilityViewIsModal
                {...elementProps(`auth-actions-menu-options`, scope)}
                style={[styles.menu, anchor, { width: Math.min(248, width - 32) }]}
              >
                <View {...elementProps(`auth-actions-menu-heading`, scope)} style={styles.heading}>
                  <Text
                    numberOfLines={1}
                    style={styles.name}
                    {...elementProps(`auth-actions-menu-name`, scope)}
                  >
                    {user.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={styles.email}
                    {...elementProps(`auth-actions-menu-email`, scope)}
                  >
                    {user.email}
                  </Text>
                </View>
                <Link href={state.profileRoute.href} asChild>
                  <Pressable
                    onPress={state.closeMenu}
                    accessibilityRole={`link`}
                    {...elementProps(`auth-actions-menu-profile`, scope)}
                    style={({ pressed }) => [styles.menuItem, pressed && styles.itemPressed]}
                  >
                    <Icon name={state.profileRoute.icon} color={palette.ink} id={`${scope}-user-menu-profile-icon`} size={16} />
                    <Text style={styles.menuLabel} {...elementProps(`auth-actions-menu-profile-label`, scope)}>
                      {state.profileRoute.label}
                    </Text>
                  </Pressable>
                </Link>
                {error && (
                  <Text
                    style={styles.error}
                    accessibilityLiveRegion={`polite`}
                    {...elementProps(`auth-actions-error`, scope)}
                  >
                    {error}
                  </Text>
                )}
                <Pressable
                  disabled={busy}
                  onPress={state.handleSignOut}
                  accessibilityRole={`button`}
                  {...elementProps(`auth-actions-menu-sign-out`, scope)}
                  style={({ pressed }) => [styles.menuItem, styles.signOut, (pressed || busy) && styles.pressed]}
                >
                  <Icon name={`log-out`} color={palette.red} id={`${scope}-user-menu-sign-out-icon`} size={16} />
                  <Text style={styles.signOutLabel} {...elementProps(`auth-actions-menu-sign-out-label`, scope)}>
                    {busy ? `Signing out…` : `Sign Out`}
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </>
      ) : authLinks.map((link) => (
        <Link
          asChild
          key={link.id}
          href={{ pathname: link.pathname, params: { redirect: state.redirect } }}
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
              style={[styles.label, (link.id === `sign-up` || (link.id === `sign-in` && darkHeaderSignIn)) && styles.white]}
            >
              {link.label}
            </Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}
