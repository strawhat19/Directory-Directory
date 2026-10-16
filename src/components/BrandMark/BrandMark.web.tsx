import './BrandMark.scss';
import { useTheme } from '../../shared/theme/useTheme';
import type { BrandMarkProps } from './BrandMark.types';

export default function BrandMark({
  size = 44,
  id = `brand-mark`,
  className = ``,
}: BrandMarkProps) {
  const { isDark } = useTheme();

  return (
    <img
      id={id}
      width={size}
      height={size}
      alt={`Directory Directory`}
      src={`/brand/logo/logo-${isDark ? `blue` : `black`}.svg`}
      className={`brand-mark ${className}`.trim()}
    />
  );
}
