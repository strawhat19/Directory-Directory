import './ContactPage.scss'
import { Link } from 'expo-router'
import Icon from '../Icon/Icon'
import Head from 'expo-router/head'
import SiteFooter from '../SiteFooter/SiteFooter'
import SiteHeader from '../SiteHeader/SiteHeader'
import { contactFields, useContactForm } from './useContactForm'
import { smoothScrollToElement } from '../../shared/navigation/smoothScrollToElement'

export default function ContactPage() {
  const { status, values, preview, updateField, previewMessage } = useContactForm()

  return (
    <>
      <Head>
        <title id={`contact-page-title`} className={`contact-page-title`}>
          {`Contact — Directory Directory`}
        </title>
        <meta
          name={`description`}
          id={`contact-page-description`}
          className={`contact-page-description`}
          content={`Questions, ideas, or feedback for Directory Directory. Preview a message or visit Piratechs.`}
        />
      </Head>
      <button
        type={`button`}
        id={`contact-skip-link`}
        className={`contact-skip-link`}
        onClick={() => {
          smoothScrollToElement(`#contact-main`)
          document.getElementById(`contact-main`)?.focus({ preventScroll: true })
        }}
      >
        {`Skip to contact form`}
      </button>
      <div id={`contact-page`} className={`contact-page`}>
        <div id={`contact-page-shell`} className={`contact-page__shell`}>
          <SiteHeader />
          <main id={`contact-main`} className={`contact-main`} tabIndex={-1}>
            <div id={`contact-intro`} className={`contact-intro`}>
              <Link
                href={`/`}
                id={`contact-back-link`}
                className={`contact-intro__back-link`}
              >
                <Icon name={`grid`} id={`contact-back-icon`} className={`contact-intro__back-icon`} size={14} />
                <span id={`contact-back-label`} className={`contact-intro__back-label`}>
                  {`Back to directories`}
                </span>
              </Link>
              <p id={`contact-eyebrow`} className={`contact-intro__eyebrow dd-eyebrow`}>
                <Icon name={`mail`} id={`contact-eyebrow-icon`} className={`contact-intro__eyebrow-icon`} size={16} />
                {`A little conversation`}
              </p>
              <h1 id={`contact-heading`} className={`contact-intro__heading`}>
                {`Contact`}
              </h1>
              <p id={`contact-description`} className={`contact-intro__description`}>
                {`An idea, a question, or something worth finding? There's always room for a good conversation.`}
              </p>
              <div id={`contact-notice`} className={`contact-intro__notice`}>
                <h2 id={`contact-notice-heading`} className={`contact-intro__notice-heading`}>
                  {`A preview, for now`}
                </h2>
                <p id={`contact-notice-description`} className={`contact-intro__notice-description`}>
                  {`This form isn't connected to a delivery service. You can preview your draft here; nothing is sent or saved outside this page's memory.`}
                </p>
              </div>
              <a
                target={`_blank`}
                rel={`noopener noreferrer`}
                href={`https://piratechs.com/`}
                id={`contact-piratechs-link`}
                className={`contact-intro__external-link`}
              >
                <span id={`contact-piratechs-label`} className={`contact-intro__external-label`}>
                  {`Visit Piratechs`}
                </span>
                <Icon name={`arrow-up-right`} id={`contact-piratechs-icon`} className={`contact-intro__external-icon`} size={16} />
              </a>
            </div>
            <div id={`contact-form-panel`} className={`contact-form-panel`}>
              <form
                id={`contact-form`}
                className={`contact-form`}
                aria-describedby={`contact-notice-description`}
                onSubmit={(event) => {
                  event.preventDefault()
                  previewMessage()
                }}
              >
                <h2 id={`contact-form-heading`} className={`contact-form__heading`}>
                  {`Write a little note`}
                </h2>
                {contactFields.map((field) => (
                  <div key={field.id} id={`contact-field-${field.id}`} className={`contact-form__field`}>
                    <label
                      htmlFor={`contact-input-${field.id}`}
                      id={`contact-label-${field.id}`}
                      className={`contact-form__label`}
                    >
                      {field.label}
                    </label>
                    {field.id === `message` ? (
                      <textarea
                        required
                        rows={6}
                        name={field.id}
                        value={values[field.id]}
                        placeholder={field.placeholder}
                        id={`contact-input-${field.id}`}
                        className={`contact-form__input contact-form__input--message`}
                        onChange={(event) => updateField(field.id, event.target.value)}
                      />
                    ) : (
                      <input
                        required
                        name={field.id}
                        autoComplete={field.id}
                        value={values[field.id]}
                        placeholder={field.placeholder}
                        id={`contact-input-${field.id}`}
                        className={`contact-form__input`}
                        type={field.id === `email` ? `email` : `text`}
                        onChange={(event) => updateField(field.id, event.target.value)}
                      />
                    )}
                  </div>
                ))}
                <button
                  type={`submit`}
                  id={`contact-preview-button`}
                  className={`contact-form__button dd-button dd-button--primary`}
                >
                  <span id={`contact-preview-button-label`} className={`contact-form__button-label`}>
                    {`Preview message`}
                  </span>
                  <Icon name={`arrow-right`} id={`contact-preview-button-icon`} className={`contact-form__button-icon`} size={17} />
                </button>
                {status ? (
                  <p
                    role={`status`}
                    id={`contact-form-status`}
                    className={`contact-form__status`}
                  >
                    {status}
                  </p>
                ) : null}
              </form>
              {preview ? (
                <section
                  id={`contact-preview`}
                  className={`contact-preview`}
                  aria-labelledby={`contact-preview-heading`}
                >
                  <h2 id={`contact-preview-heading`} className={`contact-preview__heading`}>
                    {`Local message preview`}
                  </h2>
                  <p id={`contact-preview-name`} className={`contact-preview__name`}>
                    {preview.name}
                  </p>
                  <p id={`contact-preview-email`} className={`contact-preview__email`}>
                    {preview.email}
                  </p>
                  <p id={`contact-preview-message`} className={`contact-preview__message`}>
                    {preview.message}
                  </p>
                </section>
              ) : null}
            </div>
          </main>
          <SiteFooter />
        </div>
      </div>
    </>
  )
}
