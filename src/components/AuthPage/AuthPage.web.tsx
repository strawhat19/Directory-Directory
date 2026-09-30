import './AuthPage.scss'
import Icon from '../Icon/Icon'
import { Link } from 'expo-router'
import Head from 'expo-router/head'
import SiteFooter from '../SiteFooter/SiteFooter'
import SiteHeader from '../SiteHeader/SiteHeader'
import type { AuthPageProps } from './AuthPage.types'
import { authDemoNotice, useAuthPage } from './useAuthPage'

export default function AuthPage({ mode }: AuthPageProps) {
  const {
    error,
    ready,
    fields,
    values,
    submit,
    content,
    pending,
    disabled,
    switchHref,
    updateField,
  } = useAuthPage(mode)

  return (
    <>
      <Head>
        <title id={`auth-page-title-${mode}`} className={`auth-page-title`}>
          {`${content.label} — Directory Directory`}
        </title>
        <meta
          name={`description`}
          content={content.description}
          id={`auth-page-description-${mode}`}
          className={`auth-page-description`}
        />
      </Head>
      <a
        href={`#auth-main-${mode}`}
        id={`auth-skip-link-${mode}`}
        className={`auth-skip-link`}
      >
        {`Skip to ${content.label.toLowerCase()} form`}
      </a>
      <div id={`auth-page-${mode}`} className={`auth-page`}>
        <div id={`auth-page-shell-${mode}`} className={`auth-page__shell`}>
          <SiteHeader />
          <main id={`auth-main-${mode}`} className={`auth-main`}>
            <section id={`auth-panel-${mode}`} className={`auth-panel`}>
              <p id={`auth-eyebrow-${mode}`} className={`auth-panel__eyebrow dd-eyebrow`}>
                <Icon
                  size={16}
                  name={content.icon}
                  id={`auth-eyebrow-icon-${mode}`}
                  className={`auth-panel__eyebrow-icon`}
                />
                {`Your local profile`}
              </p>
              <h1 id={`auth-heading-${mode}`} className={`auth-panel__heading`}>
                {content.title}
              </h1>
              <p id={`auth-description-${mode}`} className={`auth-panel__description`}>
                {content.description}
              </p>
              <p id={`auth-demo-notice-${mode}`} className={`auth-panel__notice`}>
                {authDemoNotice}
              </p>
              <form
                id={`auth-form-${mode}`}
                className={`auth-form`}
                aria-describedby={`auth-demo-notice-${mode}`}
                onSubmit={(event) => {
                  event.preventDefault()
                  void submit()
                }}
              >
                {fields.map((field) => (
                  <div
                    key={field.id}
                    id={`auth-field-${mode}-${field.id}`}
                    className={`auth-form__field`}
                  >
                    <label
                      htmlFor={`auth-input-${mode}-${field.id}`}
                      id={`auth-label-${mode}-${field.id}`}
                      className={`auth-form__label`}
                    >
                      {field.label}
                    </label>
                    <input
                      required
                      name={field.id}
                      disabled={disabled}
                      autoComplete={field.id}
                      value={values[field.id]}
                      placeholder={field.placeholder}
                      id={`auth-input-${mode}-${field.id}`}
                      className={`auth-form__input`}
                      type={field.id === `email` ? `email` : `text`}
                      onChange={(event) => updateField(field.id, event.target.value)}
                    />
                  </div>
                ))}
                {error ? (
                  <p
                    role={`alert`}
                    id={`auth-form-error-${mode}`}
                    className={`auth-form__error`}
                  >
                    {error}
                  </p>
                ) : null}
                <button
                  type={`submit`}
                  disabled={disabled}
                  aria-busy={pending}
                  id={`auth-submit-button-${mode}`}
                  className={`auth-form__button dd-button dd-button--primary`}
                >
                  <Icon
                    size={17}
                    name={content.icon}
                    id={`auth-submit-icon-${mode}`}
                    className={`auth-form__button-icon`}
                  />
                  <span
                    id={`auth-submit-label-${mode}`}
                    className={`auth-form__button-label`}
                  >
                    {!ready ? `Loading local profiles…` : pending ? `Opening profile…` : content.label}
                  </span>
                </button>
              </form>
              <div id={`auth-switch-${mode}`} className={`auth-switch`}>
                <p id={`auth-switch-prompt-${mode}`} className={`auth-switch__prompt`}>
                  {content.switchPrompt}
                </p>
                <Link
                  href={switchHref}
                  id={`auth-switch-link-${mode}`}
                  className={`auth-switch__link`}
                >
                  <Icon
                    size={15}
                    name={content.switchIcon}
                    id={`auth-switch-icon-${mode}`}
                    className={`auth-switch__icon`}
                  />
                  <span id={`auth-switch-label-${mode}`} className={`auth-switch__label`}>
                    {content.switchLabel}
                  </span>
                </Link>
              </div>
            </section>
          </main>
          <SiteFooter />
        </div>
      </div>
    </>
  )
}
