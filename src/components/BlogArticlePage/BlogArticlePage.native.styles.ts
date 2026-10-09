import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  figure: { gap: 14 },
  image: { width: `100%`, aspectRatio: 1.8, borderRadius: 20 },
  caption: { fontSize: 12, lineHeight: 21 },
  summary: { fontSize: 16, lineHeight: 28 },
  paragraph: { fontSize: 16, lineHeight: 29 },
  sectionTitle: { fontSize: 24, lineHeight: 32 },
  actionLabel: { fontSize: 14, lineHeight: 20 },
  metadataLabel: { fontSize: 12, lineHeight: 18 },
  prose: { padding: 24, borderWidth: 1, borderRadius: 16 },
  section: { gap: 16, paddingVertical: 24, borderBottomWidth: 1 },
  tags: { gap: 8, flexWrap: `wrap`, flexDirection: `row` },
  tag: { borderRadius: 999, paddingVertical: 7, paddingHorizontal: 12 },
  sources: { gap: 14, paddingTop: 24 },
  source: { gap: 8, minHeight: 44, flexDirection: `row`, alignItems: `center` },
  sourceLabel: { fontSize: 14, flexShrink: 1, lineHeight: 24 },
  related: { gap: 24 },
  relatedIntro: { gap: 14 },
  relatedGrid: { gap: 20, flexWrap: `wrap`, flexDirection: `row` },
  browse: { gap: 16, flexWrap: `wrap`, flexDirection: `row`, justifyContent: `space-between` },
});
