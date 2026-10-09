import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  intro: { gap: 14 },
  section: { gap: 24 },
  heroCopy: { gap: 18 },
  heroIntro: { gap: 28 },
  heroCopyWide: { flex: 1 },
  heading: { fontSize: 30, lineHeight: 39, letterSpacing: -0.9 },
  heroBadgeWide: { alignSelf: `center` },
  heroBadge: { maxWidth: 260, alignSelf: `flex-end` },
  heroIntroWide: { flexDirection: `row`, alignItems: `center` },
  grid: { gap: 20, rowGap: 30, flexWrap: `wrap`, flexDirection: `row` },
});
