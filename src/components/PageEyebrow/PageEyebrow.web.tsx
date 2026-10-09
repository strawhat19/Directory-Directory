import './PageEyebrow.scss';
import Icon from '../Icon/Icon';
import type { CSSProperties } from 'react';
import type { PageEyebrowProps } from './PageEyebrow.types';
import { getPageNavigation } from '../../shared/navigation/siteNavigation';

const PageEyebrow = ({ id, page, label, iconId, labelId, className = `` }: PageEyebrowProps) => {
  const { icon, color } = getPageNavigation(page);

  return (
    <p
      id={id}
      className={`page-eyebrow dd-eyebrow ${className}`.trim()}
      style={{ [`--page-accent`]: color } as CSSProperties}
    >
      <Icon size={15} name={icon} color={color} id={iconId ?? `${id}-icon`} className={`page-eyebrow__icon`} />
      <span id={labelId ?? `${id}-label`} className={`page-eyebrow__label`}>{label}</span>
    </p>
  );
};

export default PageEyebrow;
