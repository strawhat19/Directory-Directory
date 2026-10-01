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
    maxWidth: 140,
    fontSize: 12,
    color: palette.ink,
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
