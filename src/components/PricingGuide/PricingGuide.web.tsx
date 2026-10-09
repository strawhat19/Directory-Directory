import './PricingGuide.scss';
import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import type { CSSProperties } from 'react';
import { pricingGuideContent } from './pricingGuideContent';

const PricingGuide = () => (
  <section id={`pricing-guide`} className={`pricing-guide`} aria-labelledby={`pricing-guide-heading`}>
    <div id={`pricing-guide-intro`} className={`pricing-guide__intro`}>
      <p id={`pricing-guide-eyebrow`} className={`pricing-guide__eyebrow dd-eyebrow`}>{pricingGuideContent.eyebrow}</p>
      <h2 id={`pricing-guide-heading`} className={`pricing-guide__heading`}>{pricingGuideContent.title}</h2>
      <p id={`pricing-guide-summary`} className={`pricing-guide__summary`}>{pricingGuideContent.summary}</p>
    </div>
    <div id={`pricing-guide-grid`} className={`pricing-guide__grid`}>
      {pricingGuideContent.items.map((item) => (
        <article
          key={item.id}
          id={`pricing-guide-card-${item.id}`}
          className={`pricing-guide__card`}
          aria-labelledby={`pricing-guide-title-${item.id}`}
          style={{ [`--guide-color`]: item.color } as CSSProperties}
        >
          <span id={`pricing-guide-symbol-${item.id}`} className={`pricing-guide__symbol`}>
            <Icon size={22} name={item.icon} id={`pricing-guide-icon-${item.id}`} className={`pricing-guide__icon`} />
          </span>
          <h3 id={`pricing-guide-title-${item.id}`} className={`pricing-guide__title`}>{item.title}</h3>
          <p id={`pricing-guide-description-${item.id}`} className={`pricing-guide__description`}>{item.description}</p>
        </article>
      ))}
    </div>
    <Link href={`/docs`} id={`pricing-guide-docs-link`} className={`pricing-guide__link`}>
      <Icon size={16} name={`learning`} id={`pricing-guide-docs-icon`} className={`pricing-guide__link-icon`} />
      <span id={`pricing-guide-docs-label`} className={`pricing-guide__link-label`}>{`Read the Browsing Guide`}</span>
      <Icon size={15} name={`arrow-right`} id={`pricing-guide-docs-arrow`} className={`pricing-guide__link-arrow`} />
    </Link>
  </section>
);

export default PricingGuide;
