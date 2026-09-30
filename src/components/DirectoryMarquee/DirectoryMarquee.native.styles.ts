import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  bar: {
    gap: 8,
    height: 58,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: `row`,
    alignItems: `center`,
    borderColor: `#e3e7ee`,
    backgroundColor: `#ffffff`,
  },
  viewport: {
    flex: 1,
    height: 56,
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
  control: {
    gap: 5,
    minWidth: 66,
    minHeight: 44,
    borderRadius: 8,
    paddingHorizontal: 7,
    alignItems: `center`,
    flexDirection: `row`,
    justifyContent: `center`,
    backgroundColor: `#f7f8fa`,
  },
  controlLabel: {
    fontSize: 10,
    color: `#6b7280`,
    fontWeight: `600`,
  },
  pressed: {
    opacity: 0.65,
  },
  disabled: {
    opacity: 0.55,
  },
});
