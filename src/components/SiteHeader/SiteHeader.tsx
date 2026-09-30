import './SiteHeader.scss'
import Icon from '../Icon/Icon'
import { useSiteHeader } from './useSiteHeader'
import BrandMark from '../BrandMark/BrandMark'

type SiteHeaderProps = {
  onNavigate: (id: string) => void
}

export default function SiteHeader({ onNavigate }: SiteHeaderProps) {
  const { savedCount, showSaved } = useSiteHeader(onNavigate)

  return (
    <header id={`site-header`} className={`site-header`}>
      <a
        href={`#top`}
        id={`header-brand-link`}
        className={`site-header__brand`}
        aria-label={`Directory Directory home`}
      >
        <BrandMark
          size={42}
          id={`header-brand-mark`}
          className={`site-header__brand-mark`}
        />
        <span id={`header-brand-name`} className={`site-header__brand-name`}>
          {`Directory`}
          <span id={`header-brand-second-line`} className={`site-header__brand-line`}>
            {`Directory`}
          </span>
        </span>
      </a>
      <nav
        id={`header-navigation`}
        className={`site-header__navigation`}
        aria-label={`Main navigation`}
      >
        <a
          href={`#explore`}
          id={`header-explore-link`}
          className={`site-header__nav-link`}
        >
          {`Explore`}
          <Icon name={`arrow-right`} id={`header-explore-icon`} size={14} />
        </a>
        <a
          href={`#categories`}
          id={`header-categories-link`}
          className={`site-header__nav-link site-header__nav-link--categories`}
        >
          {`Categories`}
          <Icon name={`grid`} id={`header-categories-icon`} size={14} />
        </a>
        <button
          type={`button`}
          id={`header-saved-button`}
          className={`site-header__saved-button`}
          onClick={showSaved}
        >
          <Icon name={`bookmark`} id={`header-saved-icon`} size={16} />
          <span id={`header-saved-label`} className={`site-header__saved-label`}>
            {`Saved`}
          </span>
          <span id={`header-saved-count`} className={`site-header__saved-count`}>
            {savedCount}
          </span>
        </button>
      </nav>
    </header>
  )
}
