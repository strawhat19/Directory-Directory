import Icon from '../Icon/Icon';
import { Text, View } from 'react-native';
import { styles } from './PageEyebrow.native.styles';
import type { PageEyebrowProps } from './PageEyebrow.types';
import { useTheme } from '../../shared/theme/useTheme';
import { elementProps } from '../../shared/ui/elementProps';
import { getNativePalette } from '../../shared/theme/nativePalette';
import { useFonts, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { getPageNavigation } from '../../shared/navigation/siteNavigation';

const PageEyebrow = ({ id, page, label, style, iconId, labelId, className = `` }: PageEyebrowProps) => {
  const { isDark } = useTheme();
  const { icon, color } = getPageNavigation(page);
  const palette = getNativePalette(isDark);
  const [fontsLoaded] = useFonts({ Inter_600SemiBold });

  return (
    <View
      {...elementProps(`page-eyebrow ${className}`.trim())}
      id={id}
      testID={id}
      nativeID={id}
      style={[styles.badge, { borderColor: `${color}29`, backgroundColor: `${color}0f` }, style]}
    >
      <Icon size={15} name={icon} color={color} id={iconId ?? `${id}-icon`} className={`page-eyebrow-icon`} />
      <Text
        {...elementProps(`page-eyebrow-label`)}
        id={labelId ?? `${id}-label`}
        testID={labelId ?? `${id}-label`}
        nativeID={labelId ?? `${id}-label`}
        style={[styles.label, { color: palette.ink, fontFamily: fontsLoaded ? `Inter_600SemiBold` : undefined }]}
      >
        {label}
      </Text>
    </View>
  );
};

export default PageEyebrow;
