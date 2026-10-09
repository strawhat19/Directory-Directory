import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  badge: {
    gap: 8,
    borderWidth: 1,
    borderRadius: 999,
    maxWidth: `100%`,
    paddingVertical: 7,
    paddingHorizontal: 11,
    flexDirection: `row`,
    alignItems: `center`,
    alignSelf: `flex-start`,
  },
  label: {
    fontSize: 10,
    flexShrink: 1,
    lineHeight: 16,
    fontWeight: `600`,
    letterSpacing: 1.4,
    textTransform: `uppercase`,
  },
});
