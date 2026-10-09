import './ProfilePage.scss';
import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import Head from 'expo-router/head';
import PageCta from '../PageCta/PageCta';
import SiteFooter from '../SiteFooter/SiteFooter';
import SiteHeader from '../SiteHeader/SiteHeader';
import { useProfilePage } from './useProfilePage';
import AuthActions from '../AuthActions/AuthActions';
import { pageCtas } from '../../shared/cta/pageCtas';

export default function ProfilePage() {
  const state = useProfilePage();
  const { user, ready } = state;

  return (
    <>
      <Head>
        <title id={`profile-page-title`} className={`profile-page-title`}>
          {`Profile — Directory Directory`}
        </title>
      </Head>
      <div id={`profile-page`} className={`profile-page`}>
        <div id={`profile-page-shell`} className={`profile-page__shell`}>
          <SiteHeader />
          <main id={`profile-main`} className={`profile-main`}>
            <p id={`profile-eyebrow`} className={`profile-main__eyebrow dd-eyebrow`}>
              <Icon name={`user`} id={`profile-eyebrow-icon`} size={15} />
              <span id={`profile-eyebrow-label`} className={`profile-main__eyebrow-label`}>
                {`Your account`}
              </span>
            </p>
            <h1 id={`profile-heading`} className={`profile-main__heading`}>
              {`Profile`}
            </h1>
            {!ready ? (
              <div
                role={`status`}
                aria-label={`Loading profile`}
                id={`profile-loading`}
                className={`profile-card profile-card--loading`}
              >
                <span id={`profile-loading-avatar`} className={`profile-card__skeleton-avatar`} />
                <span id={`profile-loading-name`} className={`profile-card__skeleton-line`} />
                <span id={`profile-loading-email`} className={`profile-card__skeleton-line`} />
              </div>
            ) : user ? (
              <div id={`profile-layout`} className={`profile-layout`}>
                <nav id={`profile-navigation`} className={`profile-navigation`} aria-label={`Account navigation`}>
                  <Link
                    href={state.profileRoute.href}
                    aria-current={`page`}
                    id={`profile-navigation-account`}
                    className={`profile-navigation__link profile-navigation__link--active`}
                  >
                    <Icon name={state.profileRoute.icon} id={`profile-navigation-account-icon`} size={16} />
                    <span id={`profile-navigation-account-label`} className={`profile-navigation__label`}>
                      {state.profileRoute.label}
                    </span>
                  </Link>
                  <Link href={`/`} id={`profile-navigation-home`} className={`profile-navigation__link`}>
                    <Icon name={`grid`} id={`profile-navigation-home-icon`} size={16} />
                    <span id={`profile-navigation-home-label`} className={`profile-navigation__label`}>
                      {`Browse directories`}
                    </span>
                  </Link>
                </nav>
                <section id={`profile-account`} className={`profile-card`} aria-labelledby={`profile-account-name`}>
                  {user.photoURL ? (
                    <img alt={user.name} src={user.photoURL} id={`profile-avatar`} className={`profile-card__avatar`} />
                  ) : (
                    <span
                      aria-hidden={true}
                      id={`profile-avatar`}
                      className={`profile-card__avatar profile-card__avatar--initial`}
                      style={{ color: state.avatarTextColor, backgroundColor: state.avatarColor }}
                    >
                      {state.initial}
                    </span>
                  )}
                  <h2 id={`profile-account-name`} className={`profile-card__name`}>
                    {user.name}
                  </h2>
                  <p id={`profile-account-email`} className={`profile-card__email`}>
                    {user.email}
                  </p>
                  <p id={`profile-account-note`} className={`profile-card__note`}>
                    {`Your Directory Directory account.`}
                  </p>
                </section>
              </div>
            ) : (
              <section id={`profile-sign-in-prompt`} className={`profile-card`} aria-labelledby={`profile-sign-in-heading`}>
                <Icon name={`user`} id={`profile-sign-in-icon`} className={`profile-card__prompt-icon`} size={32} />
                <h2 id={`profile-sign-in-heading`} className={`profile-card__name`}>
                  {`Sign in to view this`}
                </h2>
                <p id={`profile-sign-in-copy`} className={`profile-card__note`}>
                  {`Sign in or create an account to view your profile.`}
                </p>
                <AuthActions scope={`profile-prompt`} />
              </section>
            )}
            <PageCta content={pageCtas.profile} />
          </main>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}
