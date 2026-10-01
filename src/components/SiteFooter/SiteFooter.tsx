import './SiteFooter.scss'
import Icon from '../Icon/Icon'
import { useSiteFooter } from './useSiteFooter'
import BrandMark from '../BrandMark/BrandMark'
import { smoothScrollToElement } from '../../shared/navigation/smoothScrollToElement'

export default function SiteFooter() {
  const { year, isHome } = useSiteFooter()
  const scrollToTop = () => smoothScrollToElement(isHome ? `#top` : `#site-header`)

  return (
    <footer id={`site-footer`} className={`site-footer`}>
      <div id={`footer-bottom`} className={`site-footer__bottom`}>
        <a
          href={`/`}
          onClick={isHome ? (event) => {
            event.preventDefault()
            scrollToTop()
          } : undefined}
          id={`footer-brand-link`}
          className={`site-footer__brand`}
          aria-label={`Directory Directory home`}
        >
          <BrandMark size={25} id={`footer-brand-mark`} />
          <span id={`footer-brand-name`} className={`site-footer__brand-name`}>
            {`Directory Directory`}
          </span>
        </a>
        <div id={`footer-details`} className={`site-footer__details`}>
          <p id={`footer-copyright`} className={`site-footer__copyright`}>
            {`© ${year === null ? `` : `${year} `}Directory Directory.`}
          </p>
        </div>
        <div id={`footer-actions`} className={`site-footer__actions`}>
          <a
            target={`_blank`}
            id={`footer-piratechs-link`}
            href={`https://piratechs.com/`}
            rel={`noopener noreferrer`}
            className={`site-footer__creator`}
          >
            {`Made by Piratechs`}
            <Icon
              size={13}
              name={`arrow-up-right`}
              color={`var(--dd-blue)`}
              id={`footer-piratechs-icon`}
              className={`site-footer__arrow`}
            />
          </a>
          <button
            type={`button`}
            onClick={scrollToTop}
            id={`footer-back-top`}
            className={`site-footer__back-top`}
          >
            {`Back to top`}
            <Icon
              size={13}
              name={`arrow-up-right`}
              color={`var(--dd-blue)`}
              id={`footer-back-top-icon`}
              className={`site-footer__arrow`}
            />
          </button>
        </div>
      </div>
    </footer>
  )
}
