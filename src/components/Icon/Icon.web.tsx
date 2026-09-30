import './Icon.scss';
import { iconPaths } from './Icon.paths';
import type { IconProps } from './Icon.types';

export default function Icon({
  id,
  name,
  size = 20,
  className = ``,
  color = `currentColor`,
}: IconProps) {
  const iconId = id ?? `icon-${name}`;

  return (
    <svg
      id={iconId}
      width={size}
      height={size}
      fill={`none`}
      stroke={color}
      strokeWidth={1.7}
      aria-hidden={`true`}
      viewBox={`0 0 24 24`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      className={`icon icon--${name} ${className}`.trim()}
    >
      {iconPaths[name].map((path, index) => (
        <path
          d={path}
          className={`icon-path`}
          key={`${iconId}-${index}`}
          id={`${iconId}-path-${index}`}
        />
      ))}
    </svg>
  );
}
