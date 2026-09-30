import './BrandMark.scss';
import type { BrandMarkProps } from './BrandMark.types';

export default function BrandMark({
  size = 44,
  id = `brand-mark`,
  className = ``,
}: BrandMarkProps) {
  return (
    <img
      id={id}
      width={size}
      height={size}
      alt={`Directory Directory`}
      src={`/directory-directory-logo.svg`}
      className={`brand-mark ${className}`.trim()}
    />
  );
}
