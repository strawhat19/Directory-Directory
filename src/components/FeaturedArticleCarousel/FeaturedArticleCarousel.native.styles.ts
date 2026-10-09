import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  band: { overflow: `hidden`, paddingBottom: 32 },
  dotGrid: { opacity: 0.14, position: `absolute` },
  dotGridTop: { top: 18, left: 12 },
  dotGridBottom: { right: 12, bottom: 18 },
  stage: { zIndex: 1, alignSelf: `center`, position: `relative` },
  slide: { position: `absolute`, backfaceVisibility: `hidden` },
  controls: { gap: 8, zIndex: 2, width: `100%`, marginTop: 24, alignItems: `center` },
  dots: { gap: 4, width: `100%`, maxWidth: 320, flexDirection: `row`, alignItems: `center`, justifyContent: `center` },
  dotButton: { flex: 1, minHeight: 44, maxWidth: 40, alignItems: `center`, justifyContent: `center` },
  dot: { height: 8, borderRadius: 4 },
  actions: { gap: 12, flexWrap: `wrap`, flexDirection: `row`, alignItems: `center`, justifyContent: `center` },
  button: { gap: 8, minWidth: 44, minHeight: 44, borderRadius: 10, paddingHorizontal: 12, flexDirection: `row`, alignItems: `center`, justifyContent: `center`, backgroundColor: `#ffffff` },
  previousIcon: { transform: [{ rotate: `180deg` }] },
  position: { fontSize: 13, lineHeight: 20, fontVariant: [`tabular-nums`] },
});
