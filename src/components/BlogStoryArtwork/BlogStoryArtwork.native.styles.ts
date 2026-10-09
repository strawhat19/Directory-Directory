import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  frame: { ...StyleSheet.absoluteFillObject, overflow: `hidden` },
  dots: { ...StyleSheet.absoluteFillObject },
  ring: { top: `-18%`, right: `-15%`, width: `58%`, aspectRatio: 1, borderWidth: 1, borderRadius: 999, position: `absolute` },
  ringInner: { ...StyleSheet.absoluteFillObject, borderWidth: 22, borderRadius: 999 },
  folder: { top: `23%`, left: `16%`, right: `16%`, bottom: `20%`, borderWidth: 1, borderTopLeftRadius: 0, borderTopRightRadius: 16, borderBottomLeftRadius: 16, borderBottomRightRadius: 16, position: `absolute` },
  tab: { top: -18, left: -1, width: `32%`, height: 18, borderWidth: 1, borderBottomWidth: 0, borderTopLeftRadius: 9, borderTopRightRadius: 12, position: `absolute` },
  folderBack: { transform: [{ translateX: 10 }, { translateY: -11 }, { rotate: `-13deg` }] },
  folderMiddle: { transform: [{ translateX: -10 }, { translateY: -1 }, { rotate: `9deg` }] },
  folderMain: { gap: 10, padding: 16, alignItems: `center`, justifyContent: `center`, shadowColor: `#14213d`, shadowRadius: 16, shadowOpacity: 0.08, shadowOffset: { width: 0, height: 10 }, elevation: 3 },
  folderCompact: { top: `20%`, bottom: `16%` },
  folderMainCompact: { gap: 6, padding: 8 },
  category: { fontSize: 16, lineHeight: 22, textAlign: `center` },
  categoryCompact: { fontSize: 14, lineHeight: 20 },
  brand: { gap: 8, right: 20, bottom: 16, position: `absolute`, flexDirection: `row`, alignItems: `center` },
  brandCompact: { right: 12, bottom: 10 },
  brandLabel: { fontSize: 11, lineHeight: 13, letterSpacing: -0.2 },
  brandLabelCompact: { fontSize: 10, lineHeight: 11 },
});
