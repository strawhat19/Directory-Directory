import { StyleSheet } from 'react-native';
import { getNativePalette } from '../../shared/theme/nativePalette';
import type { SearchAccent } from '../../shared/landing/searchScopes';

export const createAuthActionsStyles = (isDark: boolean, accent?: SearchAccent) => {
  const palette = getNativePalette(isDark, accent);

  return StyleSheet.create({
  actions: {
    gap: 9,
    flexWrap: `wrap`,
    flexDirection: `row`,
    alignItems: `center`,
  },
  button: {
    gap: 7,
    minHeight: 44,
    borderRadius: 9,
    paddingVertical: 11,
    paddingHorizontal: 14,
    flexDirection: `row`,
    alignItems: `center`,
    backgroundColor: palette.blueSoft,
  },
  primary: {
    backgroundColor: palette.blue,
  },
  label: {
    fontSize: 12,
    color: palette.blue,
  },
  white: {
    color: palette.white,
  },
  name: {
    fontSize: 14,
    fontWeight: `700`,
    color: palette.ink,
  },
  avatarButton: {
    width: 44,
    height: 44,
    padding: 3,
    borderWidth: 1,
    borderRadius: 22,
    alignItems: `center`,
    justifyContent: `center`,
    borderColor: palette.border,
    backgroundColor: palette.surface,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: `center`,
    justifyContent: `center`,
  },
  initial: {
    fontSize: 16,
    fontWeight: `700`,
  },
  skeleton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: palette.border,
  },
  menuLayer: {
    flex: 1,
  },
  dismiss: {
    ...StyleSheet.absoluteFillObject,
  },
  menu: {
    padding: 6,
    elevation: 8,
    borderWidth: 1,
    borderRadius: 14,
    shadowOpacity: 0.14,
    shadowRadius: 18,
    shadowColor: `#000000`,
    position: `absolute`,
    borderColor: palette.border,
    backgroundColor: palette.surface,
    shadowOffset: { width: 0, height: 6 },
  },
  heading: {
    gap: 5,
    padding: 12,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  email: {
    fontSize: 11,
    color: palette.muted,
  },
  menuItem: {
    gap: 10,
    padding: 12,
    minHeight: 44,
    borderRadius: 8,
    flexDirection: `row`,
    alignItems: `center`,
  },
  menuLabel: {
    fontSize: 12,
    fontWeight: `600`,
    color: palette.ink,
  },
  signOut: {
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: palette.border,
  },
  signOutLabel: {
    fontSize: 12,
    fontWeight: `600`,
    color: palette.red,
  },
  itemPressed: {
    backgroundColor: palette.blueSoft,
  },
  error: {
    width: `100%`,
    fontSize: 11,
    color: palette.red,
  },
  pressed: {
    opacity: 0.65,
  },
  });
};
