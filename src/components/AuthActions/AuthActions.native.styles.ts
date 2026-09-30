import { StyleSheet } from 'react-native';
import { palette } from '../LandingPage/LandingPage.native.styles';

export const styles = StyleSheet.create({
  actions: {
    gap: 9,
    flexWrap: `wrap`,
    flexDirection: `row`,
    alignItems: `center`,
  },
  button: {
    gap: 7,
    minHeight: 44,
    borderRadius: 9,
    paddingVertical: 11,
    paddingHorizontal: 14,
    flexDirection: `row`,
    alignItems: `center`,
    backgroundColor: `#edf4ff`,
  },
  primary: {
    backgroundColor: palette.blue,
  },
  label: {
    fontSize: 12,
    color: palette.blue,
  },
  white: {
    color: palette.white,
  },
  name: {
    maxWidth: 140,
    fontSize: 12,
    color: palette.ink,
  },
  error: {
    width: `100%`,
    fontSize: 11,
    color: palette.red,
  },
  pressed: {
    opacity: 0.65,
  },
});
