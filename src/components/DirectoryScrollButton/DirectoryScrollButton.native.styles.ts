import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: 45,
    borderRadius: 12,
    overflow: `hidden`,
    alignSelf: `stretch`,
    backgroundColor: `#0874f9`,
  },
  categories: {
    backgroundColor: `#000000`,
  },
  button: {
    flex: 1,
    padding: 8,
    width: `100%`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  icon: {
    marginBottom: 10,
  },
  labelContainer: {
    minHeight: 198,
    alignItems: `center`,
    justifyContent: `center`,
  },
  label: {
    fontSize: 13,
    lineHeight: 18,
    color: `#ffffff`,
    textAlign: `center`,
  },
  labelFallback: {
    fontWeight: `600`,
  },
  arrow: {
    marginTop: 10,
    transform: [{ rotate: `180deg` }],
  },
  pressed: {
    opacity: 0.6,
  },
});
