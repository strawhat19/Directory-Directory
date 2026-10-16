import { SvgXml } from 'react-native-svg';
import { styles } from './BrandMark.styles';
import { useTheme } from '../../shared/theme/useTheme';
import { brandMarkXmlByTheme } from './BrandMark.logo';
import type { BrandMarkProps } from './BrandMark.types';
import { elementProps } from '../../shared/ui/elementProps';

export default function BrandMark({
  size = 44,
  id = `brand-mark`,
  className = ``,
}: BrandMarkProps) {
  const { theme } = useTheme();

  return (
    <SvgXml
      {...elementProps(`brand-mark ${className}`.trim())}
      id={id}
      testID={id}
      nativeID={id}
      width={size}
      height={size}
      style={styles.mark}
      xml={brandMarkXmlByTheme[theme]}
      accessibilityRole={`image`}
      accessibilityLabel={`Directory Directory`}
    />
  );
}
