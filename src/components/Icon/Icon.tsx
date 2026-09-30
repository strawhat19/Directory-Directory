import { styles } from './Icon.styles';
import { iconPaths } from './Icon.paths';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './Icon.types';
import { elementProps } from '../../shared/ui/elementProps';

export default function Icon({
  id,
  name,
  size = 20,
  className = ``,
  color = `#18243a`,
}: IconProps) {
  const iconId = id ?? `icon-${name}`;

  return (
    <Svg
      {...elementProps(`icon icon--${name} ${className}`.trim())}
      id={iconId}
      testID={iconId}
      nativeID={iconId}
      width={size}
      height={size}
      fill={name === `moon` ? color : `none`}
      stroke={color}
      strokeWidth={name === `moon` ? 1.1 : 1.7}
      style={styles.icon}
      viewBox={`0 0 24 24`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      accessibilityElementsHidden
      importantForAccessibility={`no-hide-descendants`}
    >
      {iconPaths[name].map((path, index) => (
        <Path
          {...elementProps(`icon-path`, `${iconId}-${index}`)}
          d={path}
          key={`${iconId}-${index}`}
        />
      ))}
    </Svg>
  );
}
