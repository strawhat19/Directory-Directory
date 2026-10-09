import { styles } from './Icon.styles';
import { iconPaths } from './Icon.paths';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './Icon.types';
import { filledIconPaths } from './Icon.filled.paths';
import { elementProps } from '../../shared/ui/elementProps';

export default function Icon({
  id,
  name,
  size = 20,
  filled = false,
  strokeWidth,
  className = ``,
  color = `#18243a`,
}: IconProps) {
  const iconId = id ?? `icon-${name}`;
  const solidPaths = filled ? filledIconPaths[name] : undefined;
  const paths = solidPaths ?? iconPaths[name];
  const isSolid = name === `dragon` || Boolean(solidPaths);

  return (
    <Svg
      {...elementProps(`icon icon--${name} ${className}`.trim())}
      id={iconId}
      testID={iconId}
      nativeID={iconId}
      width={size}
      height={size}
      fill={isSolid || name === `moon` ? color : `none`}
      stroke={isSolid ? `none` : color}
      strokeWidth={isSolid ? 0 : strokeWidth ?? (name === `moon` ? 1.1 : 1.7)}
      style={[styles.icon, name === `dragon` && styles.dragon]}
      viewBox={`0 0 24 24`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      accessibilityElementsHidden
      importantForAccessibility={`no-hide-descendants`}
    >
      {paths.map((path, index) => (
        <Path
          {...elementProps(`icon-path`, `${iconId}-${index}`)}
          d={path}
          fillRule={isSolid ? `evenodd` : `nonzero`}
          key={`${iconId}-${index}`}
        />
      ))}
    </Svg>
  );
}
