import { StyleSheet } from 'react-native';
import { getNativePalette } from '../../shared/theme/nativePalette';

export const createBlogStyles = (fontsLoaded: boolean, isDark: boolean) => {
  const palette = getNativePalette(isDark);
  const regular = fontsLoaded ? `Inter_400Regular` : undefined;
  const semibold = fontsLoaded ? `Inter_600SemiBold` : undefined;
  const heavy = fontsLoaded ? `Inter_800ExtraBold` : undefined;

  return StyleSheet.create({
    screen: { flex: 1, backgroundColor: palette.background },
    content: { width: `100%`, maxWidth: 1260, paddingBottom: 32, alignSelf: `center` },
    body: { gap: 30, paddingTop: 20 },
    stickyHeader: { gap: 16, zIndex: 10, paddingBottom: 16 },
    header: { gap: 18, flexWrap: `wrap`, flexDirection: `row`, alignItems: `center` },
    controls: { gap: 10, maxWidth: `100%`, flexWrap: `wrap`, marginLeft: `auto`, flexDirection: `row`, alignItems: `center`, justifyContent: `flex-end` },
    brand: { gap: 10, flexDirection: `row`, alignItems: `center` },
    brandName: { fontSize: 18, lineHeight: 19, fontFamily: heavy, color: palette.ink, letterSpacing: -0.6 },
    navigation: { gap: 8, maxWidth: `100%`, flexWrap: `wrap`, flexDirection: `row` },
    navigationLink: { gap: 6, minHeight: 44, borderRadius: 9, paddingVertical: 10, paddingHorizontal: 10, flexDirection: `row`, alignItems: `center`, backgroundColor: palette.surface },
    navigationActive: { backgroundColor: palette.blueSoft },
    navigationLabel: { fontSize: 12, fontFamily: semibold, color: palette.ink },
    activeLabel: { color: palette.blue },
    backLink: { gap: 8, minHeight: 44, flexDirection: `row`, alignItems: `center`, alignSelf: `flex-start` },
    backLabel: { fontSize: 12, fontFamily: regular, color: palette.muted },
    hero: { gap: 18 },
    eyebrow: { gap: 8, flexDirection: `row`, alignItems: `center` },
    eyebrowLabel: { fontSize: 10, letterSpacing: 1.4, fontFamily: semibold, color: palette.blue, textTransform: `uppercase` },
    heading: { fontSize: 42, lineHeight: 48, letterSpacing: -1.8, fontFamily: heavy, color: palette.ink },
    summary: { fontSize: 15, lineHeight: 26, fontFamily: regular, color: palette.muted },
    title: { fontSize: 23, lineHeight: 31, fontFamily: semibold, color: palette.ink, letterSpacing: -0.5 },
    strongTitle: { fontSize: 23, lineHeight: 31, fontFamily: heavy, fontWeight: fontsLoaded ? undefined : `800`, color: palette.ink, letterSpacing: -0.5 },
    paragraph: { fontSize: 14, lineHeight: 26, fontFamily: regular, color: palette.muted },
    metadata: { gap: 14, flexWrap: `wrap`, flexDirection: `row`, alignItems: `center` },
    metaItem: { gap: 6, flexDirection: `row`, alignItems: `center` },
    metaLabel: { fontSize: 11, fontFamily: regular, color: palette.muted },
    action: { gap: 8, minHeight: 44, flexDirection: `row`, alignItems: `center`, alignSelf: `flex-start` },
    actionLabel: { fontSize: 13, fontFamily: semibold, color: palette.blue },
    footer: { gap: 14, paddingTop: 24, borderTopWidth: 1, borderColor: palette.border },
    footerText: { fontSize: 11, lineHeight: 19, fontFamily: regular, color: palette.muted },
    pressed: { opacity: 0.65 },
  });
};
