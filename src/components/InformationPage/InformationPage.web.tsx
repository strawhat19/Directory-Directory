import './InformationPage.scss'
import { Link } from 'expo-router'
import Icon from '../Icon/Icon'
import Head from 'expo-router/head'
import SiteFooter from '../SiteFooter/SiteFooter'
import SiteHeader from '../SiteHeader/SiteHeader'
import PricingSection from '../PricingSection/PricingSection'
import type { InformationPageProps } from './InformationPage.types'
import { informationPages, informationUpdatedDate } from '../../shared/information/informationPages'
import { smoothScrollToElement } from '../../shared/navigation/smoothScrollToElement'

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
                  name={`arrow-right`}
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
              <p
                id={`information-eyebrow-${page}`}
                className={`information-hero__eyebrow dd-eyebrow`}
              >
                <Icon
                  name={content.icon}
                  id={`information-eyebrow-icon-${page}`}
                  className={`information-hero__eyebrow-icon`}
                  size={15}
                />
                {content.eyebrow}
              </p>
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
            {page === `pricing` ? <PricingSection /> : (
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
          </main>
          <SiteFooter />
        </div>
      </div>
    </>
  )
}
