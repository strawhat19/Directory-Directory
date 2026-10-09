import './PricingSection.scss'
import Icon from '../Icon/Icon'
import { Link } from 'expo-router'
import { pricingPlans } from './pricingPlans'

export default function PricingSection() {
  return (
    <section
      id={`pricing`}
      className={`pricing-section`}
      aria-labelledby={`pricing-section-heading`}
    >
      <div id={`pricing-section-content`} className={`pricing-section__content`}>
        <div id={`pricing-section-header`} className={`pricing-section__header`}>
          <p id={`pricing-section-eyebrow`} className={`pricing-section__eyebrow dd-eyebrow`}>
            <Icon
              size={14}
              name={`sparkles`}
              id={`pricing-section-eyebrow-icon`}
              className={`pricing-section__eyebrow-icon`}
            />
            <span id={`pricing-section-eyebrow-label`} className={`pricing-section__eyebrow-label`}>
              {`PLANS & POSSIBILITIES`}
            </span>
          </p>
          <h2 id={`pricing-section-heading`} className={`pricing-section__heading`}>
            {`A Little More Direction`}
          </h2>
          <p id={`pricing-section-description`} className={`pricing-section__description`}>
            {`Explore for free. Build your presence. Make your next move.`}
          </p>
        </div>
        <div id={`pricing-section-table`} className={`pricing-section__table`}>
          {pricingPlans.map((plan, planIndex) => (
            <article
              key={plan.id}
              id={`pricing-plan-${plan.id}`}
              className={`pricing-plan pricing-plan--${plan.id}${plan.highlighted ? ` pricing-plan--highlighted` : ``}`}
              aria-labelledby={`pricing-plan-name-${plan.id}`}
            >
              {plan.highlighted && (
                <span id={`pricing-plan-badge-${plan.id}`} className={`pricing-plan__badge`}>
                  {`More Visibility`}
                </span>
              )}
              <p id={`pricing-plan-audience-${plan.id}`} className={`pricing-plan__audience`}>
                {plan.audience}
              </p>
              <div id={`pricing-plan-heading-${plan.id}`} className={`pricing-plan__heading`}>
                <Icon
                  filled
                  name={plan.icon}
                  size={plan.id === `dragon` ? 40 : 34}
                  id={`pricing-plan-icon-${plan.id}`}
                  className={`pricing-plan__icon`}
                />
                <h3 id={`pricing-plan-name-${plan.id}`} className={`pricing-plan__name`}>
                  {plan.name}
                </h3>
              </div>
              <p id={`pricing-plan-summary-${plan.id}`} className={`pricing-plan__summary`}>
                {plan.summary}
              </p>
              <div id={`pricing-plan-pricing-${plan.id}`} className={`pricing-plan__pricing`}>
                <div id={`pricing-plan-price-row-${plan.id}`} className={`pricing-plan__price-row`}>
                  <p id={`pricing-plan-price-${plan.id}`} className={`pricing-plan__price`}>
                    <span id={`pricing-plan-currency-${plan.id}`} className={`pricing-plan__currency`}>
                      {plan.price.slice(0, 1)}
                    </span>
                    {plan.price.slice(1)}
                  </p>
                  <span id={`pricing-plan-period-${plan.id}`} className={`pricing-plan__period`}>
                    {plan.period.startsWith(`/`) ? (
                      <>
                        <span
                          id={`pricing-plan-period-separator-${plan.id}`}
                          className={`pricing-plan__period-separator`}
                        >
                          {`/`}
                        </span>
                        {plan.period.slice(1)}
                      </>
                    ) : plan.period}
                  </span>
                </div>
                <p id={`pricing-plan-detail-${plan.id}`} className={`pricing-plan__detail`}>
                  {plan.detail}
                </p>
              </div>
              {plan.features.length > 0 && (
                <ul id={`pricing-plan-features-${plan.id}`} className={`pricing-plan__features`}>
                  {plan.features.map((feature, index) => (
                    <li
                      key={feature}
                      id={`pricing-plan-feature-${plan.id}-${index}`}
                      className={`pricing-plan__feature`}
                    >
                      <Icon
                        size={15}
                        name={`check`}
                        id={`pricing-plan-feature-icon-${plan.id}-${index}`}
                        className={`pricing-plan__feature-icon`}
                      />
                      <span
                        id={`pricing-plan-feature-label-${plan.id}-${index}`}
                        className={`pricing-plan__feature-label`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <div id={`pricing-plan-footer-${plan.id}`} className={`pricing-plan__footer`}>
                <span id={`pricing-plan-number-${plan.id}`} className={`pricing-plan__number`}>
                  {`${String(planIndex + 1).padStart(2, `0`)} / 04`}
                </span>
                <Link
                  href={plan.id === `free` ? `/` : `/contact`}
                  id={`pricing-plan-action-${plan.id}`}
                  className={`pricing-plan__action`}
                >
                  <span id={`pricing-plan-action-label-${plan.id}`} className={`pricing-plan__action-label`}>
                    {plan.id === `free` ? `Explore Free` : `Get In Touch`}
                  </span>
                  <Icon
                    size={15}
                    name={`arrow-right`}
                    id={`pricing-plan-action-icon-${plan.id}`}
                    className={`pricing-plan__action-icon`}
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p id={`pricing-section-note`} className={`pricing-section__note`}>
          <Icon
            size={14}
            name={`info`}
            id={`pricing-section-note-icon`}
            className={`pricing-section__note-icon`}
          />
          <span id={`pricing-section-note-label`} className={`pricing-section__note-label`}>
            {`Prices are in USD. Free is available now; paid plans and features are coming soon.`}
          </span>
        </p>
      </div>
    </section>
  )
}
