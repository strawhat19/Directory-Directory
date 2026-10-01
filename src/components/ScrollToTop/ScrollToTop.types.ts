import type { LayoutChangeEvent } from 'react-native';

export type ScrollToTopProps = {
  visible: boolean
  onPress: () => void
  overPricing?: boolean
  reduceMotion?: boolean
  onLayout?: (event: LayoutChangeEvent) => void
}
