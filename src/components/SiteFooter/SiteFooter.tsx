import './SiteFooter.scss'
import Icon from '../Icon/Icon'
import { useSiteFooter } from './useSiteFooter'
import BrandMark from '../BrandMark/BrandMark'

type SiteFooterProps = {
  onExplore: () => void
}

export default function SiteFooter({ onExplore }: SiteFooterProps) {
  const { year, exploreAll } = useSiteFooter(onExplore)

  return (
    <footer id={`site-footer`} className={`site-footer`}>
      <div id={`footer-callout`} className={`site-footer__callout`}>
        <div id={`footer-callout-copy`} className={`site-footer__callout-copy`}>
          <p id={`footer-eyebrow`} className={`site-footer__eyebrow dd-eyebrow`}>
            <Icon name={`sparkles`} id={`footer-eyebrow-icon`} size={13} />
            {`Follow your curiosity`}
          </p>
          <h2 id={`footer-heading`} className={`site-footer__heading`}>
            {`A little direction goes a long way.`}
          </h2>
          <p id={`footer-description`} className={`site-footer__description`}>
            {`The best discoveries usually start with a good directory.`}
          </p>
        </div>
        <button
          type={`button`}
          onClick={exploreAll}
          id={`footer-explore-button`}
          className={`site-footer__explore dd-button dd-button--primary`}
        >
          {`Find something good`}
          <Icon name={`arrow-right`} id={`footer-explore-icon`} size={17} />
        </button>
      </div>
      <div id={`footer-bottom`} className={`site-footer__bottom`}>
        <a
          href={`#top`}
          id={`footer-brand-link`}
          className={`site-footer__brand`}
          aria-label={`Directory Directory, back to top`}
        >
          <BrandMark size={25} id={`footer-brand-mark`} />
          <span id={`footer-brand-name`} className={`site-footer__brand-name`}>
            {`Directory Directory`}
          </span>
        </a>
        <p id={`footer-copyright`} className={`site-footer__copyright`}>
          {`© ${year} Directory Directory. Made for the curious.`}
        </p>
        <a href={`#top`} id={`footer-back-top`} className={`site-footer__back-top`}>
          {`Back to top`}
          <Icon name={`arrow-up-right`} id={`footer-back-top-icon`} size={13} />
        </a>
      </div>
    </footer>
  )
}
