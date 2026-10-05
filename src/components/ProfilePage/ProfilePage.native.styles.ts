import { StyleSheet } from 'react-native';
import type { SearchAccent } from '../../shared/landing/searchScopes';
import { getNativePalette } from '../../shared/theme/nativePalette';

export function createProfileStyles(isDark: boolean, accent: SearchAccent) {
  const palette = getNativePalette(isDark, accent);

  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: palette.background,
    },
    content: {
      width: `100%`,
      maxWidth: 900,
      paddingBottom: 24,
      alignSelf: `center`,
    },
    stickyHeader: {
      zIndex: 10,
      paddingBottom: 16,
      backgroundColor: palette.headerScrim,
    },
    header: {
      gap: 16,
      flexWrap: `wrap`,
      paddingHorizontal: 20,
      flexDirection: `row`,
      alignItems: `center`,
      justifyContent: `space-between`,
    },
    brand: {
      gap: 10,
      flexDirection: `row`,
      alignItems: `center`,
    },
    brandName: {
      fontSize: 16,
      lineHeight: 18,
      fontWeight: `700`,
      color: palette.ink,
      letterSpacing: -0.6,
    },
    body: {
      gap: 24,
      padding: 20,
    },
    hero: {
      gap: 18,
      paddingVertical: 16,
    },
    eyebrow: {
      gap: 8,
      flexDirection: `row`,
      alignItems: `center`,
    },
    eyebrowLabel: {
      fontSize: 10,
      letterSpacing: 1.4,
      fontWeight: `600`,
      color: palette.blue,
    },
    heading: {
      fontSize: 42,
      lineHeight: 47,
      fontWeight: `800`,
      color: palette.ink,
      letterSpacing: -1.9,
    },
    navigation: {
      gap: 8,
      flexWrap: `wrap`,
      flexDirection: `row`,
    },
    navigationLink: {
      gap: 8,
      padding: 12,
      minHeight: 44,
      borderRadius: 9,
      flexDirection: `row`,
      alignItems: `center`,
    },
    activeLink: {
      backgroundColor: palette.blueSoft,
    },
    linkLabel: {
      fontSize: 12,
      fontWeight: `600`,
      color: palette.blue,
    },
    card: {
      gap: 14,
      padding: 24,
      borderWidth: 1,
      borderRadius: 18,
      borderColor: palette.border,
      backgroundColor: palette.surface,
    },
    avatar: {
      width: 72,
      height: 72,
      borderRadius: 36,
      alignItems: `center`,
      justifyContent: `center`,
    },
    initial: {
      fontSize: 28,
      fontWeight: `700`,
    },
    name: {
      fontSize: 24,
      fontWeight: `700`,
      color: palette.ink,
      letterSpacing: -0.6,
    },
    email: {
      fontSize: 14,
      color: palette.muted,
    },
    note: {
      fontSize: 13,
      lineHeight: 23,
      color: palette.muted,
    },
    skeleton: {
      backgroundColor: palette.border,
    },
    skeletonLine: {
      height: 14,
      width: `75%`,
      maxWidth: 240,
      borderRadius: 7,
    },
    footer: {
      gap: 14,
      paddingTop: 24,
      borderTopWidth: 1,
      borderTopColor: palette.border,
    },
    footerText: {
      fontSize: 11,
      color: palette.muted,
    },
    externalLink: {
      gap: 7,
      minHeight: 44,
      alignSelf: `flex-start`,
      flexDirection: `row`,
      alignItems: `center`,
    },
    pressed: {
      opacity: 0.65,
    },
  });
}
