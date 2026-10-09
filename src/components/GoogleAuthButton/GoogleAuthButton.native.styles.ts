import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  option: { gap: 10 },
  button: { gap: 12, minHeight: 48, borderWidth: 1, borderRadius: 10, paddingVertical: 12, paddingHorizontal: 16, flexDirection: `row`, alignItems: `center`, justifyContent: `center`, backgroundColor: `#ffffff` },
  logo: { width: 20, height: 20 },
  label: { flexShrink: 1, fontSize: 14, lineHeight: 20, color: `#1f1f1f` },
  notice: { fontSize: 12, lineHeight: 18, textAlign: `center` },
  divider: { gap: 12, marginTop: 8, flexDirection: `row`, alignItems: `center` },
  dividerLine: { flex: 1, height: 1 },
  dividerLabel: { flexShrink: 1, fontSize: 11, lineHeight: 18, textAlign: `center` },
});
