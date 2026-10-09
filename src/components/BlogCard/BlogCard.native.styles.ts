import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: { gap: 16, flex: 1, elevation: 2, padding: 24, marginTop: 14, borderWidth: 1, borderRadius: 14, shadowRadius: 12, borderTopWidth: 4, overflow: `visible`, shadowOpacity: 0.06, borderTopLeftRadius: 0, shadowColor: `#000000`, shadowOffset: { width: 0, height: 4 } },
  folderTab: { top: -18, left: -1, width: 78, height: 14, position: `absolute`, borderTopLeftRadius: 7, borderTopRightRadius: 7 },
  top: { gap: 12, flexDirection: `row`, alignItems: `center` },
  symbol: { width: 46, height: 46, borderRadius: 12, alignItems: `center`, justifyContent: `center` },
  title: { fontSize: 22, lineHeight: 30 },
  excerpt: { fontSize: 14, lineHeight: 26 },
  actionLabel: { fontSize: 14, lineHeight: 20 },
  metadataLabel: { fontSize: 12, lineHeight: 18 },
  category: { flex: 1, letterSpacing: 1, fontSize: 9 },
  footer: { gap: 10, paddingTop: 14, marginTop: `auto`, borderTopWidth: 1 },
});
