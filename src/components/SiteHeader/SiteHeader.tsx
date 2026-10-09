import './SiteHeader.scss'
import Icon from '../Icon/Icon'
import { Link } from 'expo-router'
import { useSiteHeader } from './useSiteHeader'
import BrandMark from '../BrandMark/BrandMark'
import AuthActions from '../AuthActions/AuthActions'
import DirectoryMarquee from '../DirectoryMarquee/DirectoryMarquee'

const headerNotifications = [
  {
    id: `development`,
    icon: `info`,
    title: `In development`,
    before: `This application is in development, `,
    after: ` to let us know you are interested`,
  },
  {
    id: `support`,
    icon: `sparkles`,
    title: `A note about ads`,
    before: `We are sorry to show ads, we are only doing this to support our small business, please `,
    after: ` to support us!`,
  },
] as const

export default function SiteHeader() {
  const {
    links,
    header,
    isDark,
    menuOpen,
    closeMenu,
    openSearch,
    toggleMenu,
    toggleTheme,
    notifications,
    searchVisible,
    notificationsOpen,
    toggleNotifications,
  } = useSiteHeader()

  return (
    <header ref={header} id={`site-header`} className={`site-header`}>
      <DirectoryMarquee scope={`header`} />
      <div id={`header-bar`} className={`site-header__bar`}>
        <Link
          href={`/`}
          id={`header-brand-link`}
          className={`site-header__brand`}
          onClick={closeMenu}
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
        <div id={`header-controls`} className={`site-header__controls`}>
          <div id={`header-utility-actions`} className={`site-header__utility-actions`}>
            <div
              ref={notifications}
              id={`header-notifications`}
              className={`site-header__notifications`}
            >
              <button
                type={`button`}
                id={`header-notifications-toggle`}
                aria-label={`Notifications, ${headerNotifications.length} updates`}
                aria-expanded={notificationsOpen}
                aria-controls={`header-notifications-panel`}
                onClick={toggleNotifications}
                className={`site-header__icon-button site-header__icon-button--secondary`}
              >
                <Icon
                  size={16}
                  name={`bell`}
                  id={`header-notifications-icon`}
                  className={`site-header__icon`}
                />
                <span
                  aria-hidden={true}
                  id={`header-notifications-badge`}
                  className={`site-header__notification-badge`}
                >
                  {headerNotifications.length}
                </span>
              </button>
              {notificationsOpen && (
                <div
                  role={`region`}
                  id={`header-notifications-panel`}
                  className={`site-header__notifications-panel`}
                  aria-label={`Notifications`}
                >
                  <strong
                    id={`header-notifications-heading`}
                    className={`site-header__notifications-heading`}
                  >
                    {`Notifications`}
                  </strong>
                  <span
                    id={`header-notifications-count`}
                    className={`site-header__notifications-count`}
                  >
                    {`${headerNotifications.length} updates`}
                  </span>
                  <button
                    type={`button`}
                    onClick={toggleNotifications}
                    id={`header-notifications-close`}
                    aria-label={`Close notifications`}
                    className={`site-header__notifications-close`}
                  >
                    <Icon
                      size={18}
                      name={`close`}
                      id={`header-notifications-close-icon`}
                      className={`site-header__notifications-close-icon`}
                    />
                  </button>
                  <ul
                    id={`header-notifications-list`}
                    className={`site-header__notifications-list`}
                  >
                    {headerNotifications.map((notification) => (
                      <li
                        key={notification.id}
                        id={`header-notification-${notification.id}`}
                        className={`site-header__notification-item`}
                      >
                        <span
                          id={`header-notification-symbol-${notification.id}`}
                          className={`site-header__notification-symbol`}
                        >
                          <Icon
                            size={16}
                            name={notification.icon}
                            id={`header-notification-icon-${notification.id}`}
                            className={`site-header__notification-icon`}
                          />
                        </span>
                        <div
                          id={`header-notification-copy-${notification.id}`}
                          className={`site-header__notification-copy`}
                        >
                          <strong
                            id={`header-notification-title-${notification.id}`}
                            className={`site-header__notification-title`}
                          >
                            {notification.title}
                          </strong>
                          <p
                            id={`header-notification-text-${notification.id}`}
                            className={`site-header__notification-text`}
                          >
                            {notification.before}
                            <Link
                              href={`/sign-up`}
                              id={`header-notification-sign-up-${notification.id}`}
                              className={`site-header__notification-link`}
                            >
                              {`sign up`}
                            </Link>
                            {notification.after}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <button
              type={`button`}
              id={`header-theme-toggle`}
              aria-pressed={isDark}
              onClick={toggleTheme}
              aria-label={isDark ? `Switch to light mode` : `Switch to dark mode`}
              className={`site-header__icon-button site-header__icon-button--primary`}
            >
              <Icon
                size={16}
                name={isDark ? `sun` : `moon`}
                id={`header-theme-icon`}
                className={`site-header__icon`}
              />
            </button>
            <button
              type={`button`}
              onClick={openSearch}
              id={`header-search-toggle`}
              tabIndex={searchVisible ? 0 : -1}
              aria-hidden={!searchVisible}
              aria-label={`Search directories`}
              className={`site-header__icon-button site-header__icon-button--primary site-header__search-button${searchVisible ? ` site-header__search-button--visible` : ``}`}
            >
              <Icon
                size={16}
                name={`search`}
                id={`header-search-icon`}
                className={`site-header__icon`}
              />
            </button>
          </div>
          <button
            type={`button`}
            onClick={toggleMenu}
            id={`header-menu-toggle`}
            aria-expanded={menuOpen}
            aria-controls={`header-actions`}
            aria-label={menuOpen ? `Close menu` : `Open menu`}
            className={`site-header__menu-toggle`}
          >
            <Icon
              size={16}
              name={menuOpen ? `close` : `menu`}
              id={`header-menu-icon`}
              className={`site-header__menu-icon`}
            />
          </button>
          <div
            id={`header-actions`}
            className={`site-header__actions${menuOpen ? ` site-header__actions--open` : ``}`}
          >
            <nav
              id={`header-navigation`}
              className={`site-header__navigation`}
              aria-label={`Main navigation`}
            >
              {links.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={closeMenu}
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
          </div>
          <AuthActions scope={`header`} />
        </div>
      </div>
    </header>
  )
}
