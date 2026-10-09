import type { StyleProp, ViewStyle } from 'react-native';
import type { SiteNavigationId } from '../../shared/navigation/siteNavigation';

export type PageEyebrowProps = {
  id: string;
  label: string;
  iconId?: string;
  labelId?: string;
  className?: string;
  page: SiteNavigationId;
  style?: StyleProp<ViewStyle>;
};
