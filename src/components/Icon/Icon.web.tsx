import './Icon.scss';
import { iconPaths } from './Icon.paths';
import type { IconProps } from './Icon.types';
import { filledIconPaths } from './Icon.filled.paths';

export default function Icon({
  id,
  name,
  size = 20,
  filled = false,
  className = ``,
  color = `currentColor`,
}: IconProps) {
  const iconId = id ?? `icon-${name}`;
  const solidPaths = filled ? filledIconPaths[name] : undefined;
  const paths = solidPaths ?? iconPaths[name];
  const isSolid = name === `dragon` || Boolean(solidPaths);

  return (
    <svg
      id={iconId}
      width={size}
      height={size}
      fill={isSolid || name === `moon` ? color : `none`}
      stroke={isSolid ? `none` : color}
      strokeWidth={isSolid ? 0 : name === `moon` ? 1.1 : 1.7}
      aria-hidden={`true`}
      viewBox={`0 0 24 24`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
      className={`icon icon--${name} ${className}`.trim()}
    >
      {paths.map((path, index) => (
        <path
          d={path}
          className={`icon-path`}
          fillRule={isSolid ? `evenodd` : `nonzero`}
          key={`${iconId}-${index}`}
          id={`${iconId}-path-${index}`}
        />
      ))}
    </svg>
  );
}
