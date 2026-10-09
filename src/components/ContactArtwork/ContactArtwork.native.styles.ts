import { StyleSheet } from 'react-native';

const folderOffsets = [{ marginRight: 28 }, { marginLeft: 14 }, { marginRight: 10 }];

export const styles = {
  ...StyleSheet.create({
    frame: { height: 236, width: `100%`, maxWidth: 500, overflow: `hidden`, position: `relative`, alignSelf: `flex-start` },
    frameCompact: { height: 220 },
    dots: { zIndex: 0, ...StyleSheet.absoluteFillObject },
    atomFrame: { top: -12, left: -8, right: -8, bottom: -12, zIndex: 0, position: `absolute` },
    markFrame: { top: 8, right: 8, zIndex: 1, position: `absolute`, transform: [{ rotate: `8deg` }] },
    folders: { gap: 13, left: 8, right: 76, bottom: 12, zIndex: 1, position: `absolute`, transform: [{ rotate: `-4deg` }] },
    foldersCompact: { left: 2, right: 34 },
    folder: { gap: 10, borderWidth: 1, borderRadius: 12, paddingVertical: 11, paddingHorizontal: 12, flexDirection: `row`, alignItems: `center`, borderTopLeftRadius: 0 },
    tint: { ...StyleSheet.absoluteFillObject, borderRadius: 12, borderTopLeftRadius: 0 },
    tab: { top: -9, left: -1, width: 48, height: 9, borderWidth: 1, borderBottomWidth: 0, position: `absolute`, borderTopLeftRadius: 6, borderTopRightRadius: 8 },
    number: { fontSize: 9, fontVariant: [`tabular-nums`] },
    copy: { gap: 4, flex: 1, minWidth: 0 },
    detail: { fontSize: 8, lineHeight: 10, letterSpacing: 0.8 },
    label: { fontSize: 12, lineHeight: 17 },
  }),
  folderOffsets,
};
