import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  section: { gap: 28 },
  header: { gap: 14, maxWidth: 640 },
  cards: { gap: 22, paddingTop: 12 },
  cardsWide: { flexDirection: `row` },
  card: { gap: 14, padding: 22, minWidth: 0, borderWidth: 1, borderRadius: 14, borderTopWidth: 2, borderTopLeftRadius: 0 },
  cardWide: { flex: 1 },
  tab: { top: -12, left: -1, width: 58, height: 10, position: `absolute`, borderTopLeftRadius: 5, borderTopRightRadius: 5 },
  symbol: { width: 42, height: 42, borderRadius: 11, alignItems: `center`, justifyContent: `center` },
  title: { fontSize: 18, lineHeight: 26 },
  description: { fontSize: 13, lineHeight: 24 },
});
