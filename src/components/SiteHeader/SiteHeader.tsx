import './SiteHeader.scss'
import Icon from '../Icon/Icon'
import { Link } from 'expo-router'
import { useSiteHeader } from './useSiteHeader'
import BrandMark from '../BrandMark/BrandMark'
import AuthActions from '../AuthActions/AuthActions'
import DirectoryMarquee from '../DirectoryMarquee/DirectoryMarquee'

export default function SiteHeader() {
  const { links, header } = useSiteHeader()

  return (
    <header ref={header} id={`site-header`} className={`site-header`}>
      <div id={`header-bar`} className={`site-header__bar`}>
        <Link
          href={`/`}
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
        </Link>
        <div id={`header-actions`} className={`site-header__actions`}>
          <nav
            id={`header-navigation`}
            className={`site-header__navigation`}
            aria-label={`Main navigation`}
          >
            {links.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                id={`header-${link.id}-link`}
                aria-current={link.active ? `page` : undefined}
                className={`site-header__nav-link${link.active ? ` site-header__nav-link--active` : ``}`}
              >
                <Icon
                  size={15}
                  name={link.icon}
                  color={link.color}
                  id={`header-${link.id}-icon`}
                  className={`site-header__nav-icon`}
                />
                <span
                  id={`header-${link.id}-label`}
                  className={`site-header__nav-label`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>
          <AuthActions scope={`header`} />
        </div>
      </div>
      <DirectoryMarquee scope={`header`} />
    </header>
  )
}
