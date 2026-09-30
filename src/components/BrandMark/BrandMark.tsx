import { SvgXml } from 'react-native-svg';
import { styles } from './BrandMark.styles';
import { brandMarkXml } from './BrandMark.logo';
import type { BrandMarkProps } from './BrandMark.types';
import { elementProps } from '../../shared/ui/elementProps';

export default function BrandMark({
  size = 44,
  id = `brand-mark`,
  className = ``,
}: BrandMarkProps) {
  return (
    <SvgXml
      {...elementProps(`brand-mark ${className}`.trim())}
      id={id}
      testID={id}
      nativeID={id}
      width={size}
      height={size}
      style={styles.mark}
      xml={brandMarkXml}
      accessibilityRole={`image`}
      accessibilityLabel={`Directory Directory`}
    />
  );
}
