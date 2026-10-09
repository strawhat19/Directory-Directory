import './InformationPage.scss'
import Icon from '../Icon/Icon'
import { Link } from 'expo-router'
import Head from 'expo-router/head'
import PageCta from '../PageCta/PageCta'
import SiteFooter from '../SiteFooter/SiteFooter'
import SiteHeader from '../SiteHeader/SiteHeader'
import PageEyebrow from '../PageEyebrow/PageEyebrow'
import PricingGuide from '../PricingGuide/PricingGuide'
import PricingSection from '../PricingSection/PricingSection'
import FeaturedArticle from '../FeaturedArticle/FeaturedArticle'
import { pageCtas, navigationCtas } from '../../shared/cta/pageCtas'
import type { InformationPageProps } from './InformationPage.types'
import { smoothScrollToElement } from '../../shared/navigation/smoothScrollToElement'
import { informationPages, informationUpdatedDate } from '../../shared/information/informationPages'

export default function InformationPage({ page }: InformationPageProps) {
  const content = informationPages[page]

  return (
    <>
      <Head>
        <title id={`${page}-page-title`} className={`information-page-title`}>
          {`${content.title} — Directory Directory`}
        </title>
        <meta
          name={`description`}
          content={content.summary}
          id={`${page}-page-description`}
          className={`information-page-description`}
        />
      </Head>
      <button
        type={`button`}
        id={`information-skip-link-${page}`}
        className={`information-skip-link`}
        onClick={() => {
          document.querySelector<HTMLElement>(`#information-main-${page}`)?.focus({ preventScroll: true })
          smoothScrollToElement(`#information-main-${page}`)
        }}
      >
        {`Skip to page content`}
      </button>
      <div id={`information-page-${page}`} className={`information-page`}>
        <div id={`information-shell-${page}`} className={`information-page__shell`}>
          <SiteHeader />
          <main id={`information-main-${page}`} className={`information-main`} tabIndex={-1}>
            <div id={`information-hero-${page}`} className={`information-hero`}>
              <Link
                href={`/`}
                id={`information-back-link-${page}`}
                className={`information-hero__back-link`}
              >
                <Icon
                  filled
                  name={`folder`}
                  id={`information-back-icon-${page}`}
                  className={`information-hero__back-icon`}
                  size={14}
                />
                <span
                  id={`information-back-label-${page}`}
                  className={`information-hero__back-label`}
                >
                  {`Back to directories`}
                </span>
              </Link>
              <div id={`information-hero-intro-${page}`} className={`information-hero__intro`}>
                <div id={`information-hero-copy-${page}`} className={`information-hero__copy`}>
                  <h1 id={`information-heading-${page}`} className={`information-hero__heading`}>
                    {content.title}
                  </h1>
                  <p id={`information-summary-${page}`} className={`information-hero__summary`}>
                    {content.summary}
                  </p>
                  {page === `terms` || page === `privacy` ? (
                    <p id={`information-updated-${page}`} className={`information-hero__updated`}>
                      {`Last updated ${informationUpdatedDate}`}
                    </p>
                  ) : null}
                </div>
                <PageEyebrow
                  page={page}
                  label={content.eyebrow}
                  id={`information-eyebrow-${page}`}
                  className={`information-hero__eyebrow`}
                  iconId={`information-eyebrow-icon-${page}`}
                />
              </div>
            </div>
            {page !== `discover` && page !== `pricing` ? <PageCta banner navigationPage={page} content={navigationCtas[page]} /> : null}
            {page === `pricing` ? (
              <>
                <PricingSection />
                <PricingGuide />
              </>
            ) : (
            <div id={`information-layout-${page}`} className={`information-layout`}>
              <aside id={`information-sidebar-${page}`} className={`information-sidebar`}>
                <nav
                  id={`information-contents-${page}`}
                  className={`information-sidebar__contents`}
                  aria-label={`On this page`}
                >
                  <p
                    id={`information-contents-label-${page}`}
                    className={`information-sidebar__label dd-eyebrow`}
                  >
                    {`On this page`}
                  </p>
                  {content.sections.map((section, index) => (
                    <button
                      key={section.id}
                      type={`button`}
                      id={`information-contents-link-${page}-${section.id}`}
                      className={`information-sidebar__link`}
                      onClick={() => smoothScrollToElement(`#information-section-${page}-${section.id}`)}
                    >
                      <span
                        id={`information-contents-number-${page}-${section.id}`}
                        className={`information-sidebar__number`}
                      >
                        {String(index + 1).padStart(2, `0`)}
                      </span>
                      <span
                        id={`information-contents-text-${page}-${section.id}`}
                        className={`information-sidebar__text`}
                      >
                        {section.title}
                      </span>
                      <Icon
                        name={`arrow-right`}
                        id={`information-contents-icon-${page}-${section.id}`}
                        className={`information-sidebar__icon`}
                        size={13}
                      />
                    </button>
                  ))}
                </nav>
                <div id={`information-note-${page}`} className={`information-sidebar__note`}>
                  <Icon
                    name={content.icon}
                    id={`information-note-icon-${page}`}
                    className={`information-sidebar__note-icon`}
                    size={21}
                  />
                  <h2
                    id={`information-note-title-${page}`}
                    className={`information-sidebar__note-title`}
                  >
                    {content.noteTitle}
                  </h2>
                  <p
                    id={`information-note-text-${page}`}
                    className={`information-sidebar__note-text`}
                  >
                    {content.note}
                  </p>
                </div>
              </aside>
              <div id={`information-content-${page}`} className={`information-content`}>
                {content.sections.map((section) => (
                  <section
                    key={section.id}
                    className={`information-section`}
                    id={`information-section-${page}-${section.id}`}
                    aria-labelledby={`information-section-title-${page}-${section.id}`}
                  >
                    <h2
                      className={`information-section__title`}
                      id={`information-section-title-${page}-${section.id}`}
                    >
                      {section.title}
                    </h2>
                    {section.paragraphs.map((paragraph, index) => (
                      <p
                        key={index}
                        className={`information-section__paragraph`}
                        id={`information-section-paragraph-${page}-${section.id}-${index}`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </section>
                ))}
                <div id={`information-contact-${page}`} className={`information-contact`}>
                  <p id={`information-contact-label-${page}`} className={`information-contact__label`}>
                    {`Questions or feedback?`}
                  </p>
                  <a
                    target={`_blank`}
                    rel={`noopener noreferrer`}
                    href={`https://piratechs.com/`}
                    id={`information-contact-link-${page}`}
                    className={`information-contact__link`}
                  >
                    <span
                      id={`information-contact-text-${page}`}
                      className={`information-contact__text`}
                    >
                      {`Visit Piratechs`}
                    </span>
                    <Icon
                      name={`arrow-up-right`}
                      id={`information-contact-icon-${page}`}
                      className={`information-contact__icon`}
                      size={16}
                    />
                  </a>
                </div>
              </div>
            </div>
            )}
            {page === `about` ? <FeaturedArticle fullBleed scope={`about`} /> : null}
            {page === `api` || page === `docs` || page === `terms` || page === `privacy` || page === `pricing` ? (
              <PageCta content={pageCtas[page]} navigationPage={page === `pricing` ? `pricing` : undefined} />
            ) : null}
          </main>
          <SiteFooter />
        </div>
      </div>
    </>
  )
}
