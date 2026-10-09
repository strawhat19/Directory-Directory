import './PageCta.scss';
import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import type { CSSProperties } from 'react';
import type { PageCtaProps } from './PageCta.types';
import { getPageNavigation } from '../../shared/navigation/siteNavigation';

const PageCta = ({ content, banner = false, compact = false, fullBleed = true, navigationPage }: PageCtaProps) => {
  const { id, title, eyebrow, description, primary, secondary, pattern } = content;
  const navigation = navigationPage ? getPageNavigation(navigationPage) : undefined;
  const tone = navigation?.tone ?? content.tone;
  const icon = navigation?.icon ?? content.icon;
  const buttonColor = tone === `green` ? `#157b4a` : tone === `blue` ? `#0869df` : navigation?.color;
  const colors = navigation ? { [`--cta-color`]: navigation.color, [`--cta-button-color`]: buttonColor } as CSSProperties : undefined;
  const primaryIconId = id === `blog-directory-cta` && primary.icon === `grid` ? `${id}-grid-icon` : `${id}-primary-icon`;

  return (
    <section
      id={id}
      style={colors}
      aria-labelledby={`${id}-heading`}
      className={`page-cta page-cta--${tone} page-cta--${pattern}${fullBleed ? ` page-cta--full-bleed` : ``}${compact ? ` page-cta--compact` : ``}${banner ? ` page-cta--banner` : ``}`}
    >
      <div id={`${id}-content`} className={`page-cta__content`}>
        <div id={`${id}-card`} className={`page-cta__card`}>
          <div id={`${id}-copy`} className={`page-cta__copy`}>
            {!banner ? <p id={`${id}-eyebrow`} className={`page-cta__eyebrow dd-eyebrow`}>
              <Icon size={15} name={icon} id={`${id}-eyebrow-icon`} className={`page-cta__eyebrow-icon`} />
              <span id={`${id}-eyebrow-label`} className={`page-cta__eyebrow-label`}>{eyebrow}</span>
            </p> : null}
            <h2 id={`${id}-heading`} className={`page-cta__heading`}>
              {banner ? <Icon size={24} name={icon} id={`${id}-heading-icon`} className={`page-cta__heading-icon`} /> : null}
              <span id={`${id}-heading-label`} className={`page-cta__heading-label`}>{title}</span>
            </h2>
            <p id={`${id}-text`} className={`page-cta__text`}>{description}</p>
          </div>
          <div id={`${id}-actions`} className={`page-cta__actions`}>
            <Link href={primary.href} id={`${id}-link`} className={`page-cta__link dd-button dd-button--primary`}>
              <Icon size={16} name={primary.icon} filled={primary.icon === `folder`} id={primaryIconId} className={`page-cta__action-icon`} />
              <span id={`${id}-label`} className={`page-cta__action-label`}>{primary.label}</span>
              <Icon size={16} name={`arrow-right`} id={`${id}-icon`} className={`page-cta__action-arrow`} />
            </Link>
            {secondary ? (
              <Link href={secondary.href} id={`${id}-secondary-link`} className={`page-cta__secondary dd-button`}>
                <Icon size={15} name={secondary.icon} filled={secondary.icon === `folder`} id={`${id}-secondary-icon`} className={`page-cta__secondary-icon`} />
                <span id={`${id}-secondary-label`} className={`page-cta__secondary-label`}>{secondary.label}</span>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageCta;
