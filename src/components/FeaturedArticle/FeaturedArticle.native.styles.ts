import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  fullBleed: { overflow: `hidden`, paddingVertical: 40 },
  dotGrid: { opacity: 0.14, position: `absolute` },
  dotGridTop: { top: 18, left: 12 },
  dotGridBottom: { right: 12, bottom: 18 },
  fullBleedContent: { zIndex: 1, width: `100%`, maxWidth: 1280, alignSelf: `center` },
  feature: { borderWidth: 1, borderRadius: 20, overflow: `hidden` },
  imageLink: { minWidth: 0 },
  image: { ...StyleSheet.absoluteFillObject, width: `100%`, height: `100%` },
  copy: { gap: 14, flex: 1, padding: 24 },
  title: { fontSize: 30, lineHeight: 39, letterSpacing: -0.9 },
  excerpt: { fontSize: 15, lineHeight: 27 },
  actionLabel: { fontSize: 14, lineHeight: 20 },
  metadataLabel: { fontSize: 12, lineHeight: 18 },
  actions: { gap: 14, flexWrap: `wrap`, flexDirection: `row`, alignItems: `center` },
  primary: { gap: 8, minHeight: 44, paddingVertical: 12, paddingHorizontal: 18, borderRadius: 8, flexDirection: `row`, alignItems: `center` },
});
