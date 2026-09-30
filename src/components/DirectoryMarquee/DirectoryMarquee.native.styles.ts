import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  bar: {
    height: 58,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: `row`,
    alignSelf: `center`,
    alignItems: `center`,
    borderColor: `rgba(227, 231, 238, 0.7)`,
    backgroundColor: `rgba(247, 248, 250, 0.35)`,
  },
  darkBar: {
    borderColor: `rgba(43, 57, 80, 0.7)`,
    backgroundColor: `rgba(11, 18, 32, 0.35)`,
  },
  viewport: {
    flex: 1,
    height: 56,
  },
  fade: {
    top: 1,
    bottom: 1,
    position: `absolute`,
  },
  fadeLeft: {
    left: 0,
  },
  fadeRight: {
    right: 0,
  },
  track: {
    alignItems: `center`,
    flexDirection: `row`,
  },
  cycle: {
    gap: 8,
    paddingRight: 8,
    alignItems: `center`,
    flexDirection: `row`,
  },
  pill: {
    gap: 7,
    minHeight: 36,
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: `center`,
    flexDirection: `row`,
  },
  label: {
    fontSize: 11,
    fontWeight: `600`,
  },
  pressed: {
    opacity: 0.65,
  },
});
