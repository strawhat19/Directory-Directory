import './AuthPage.scss';
import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import Head from 'expo-router/head';
import { useEffect } from 'react';
import SiteFooter from '../SiteFooter/SiteFooter';
import SiteHeader from '../SiteHeader/SiteHeader';
import AuthStory from '../AuthStory/AuthStory.web';
import type { AuthPageProps } from './AuthPage.types';
import { authDemoNotice, useAuthPage } from './useAuthPage';
import { smoothScrollToElement } from '../../shared/navigation/smoothScrollToElement';

export default function AuthPage({ mode }: AuthPageProps) {
  const {
    back,
    step,
    steps,
    error,
    ready,
    fields,
    values,
    submit,
    content,
    heading,
    pending,
    disabled,
    signingUp,
    fieldError,
    switchHref,
    description,
    submitLabel,
    updateField,
    showPassword,
    progressLabel,
    togglePassword,
  } = useAuthPage(mode);

  useEffect(() => {
    if (!ready) return;
    const firstField = signingUp ? step === 0 ? `name` : step === 1 ? `email` : `password` : `email`;
    document.getElementById(`auth-input-${mode}-${firstField}`)?.focus({ preventScroll: true });
  }, [mode, step, ready, signingUp]);

  useEffect(() => {
    if (fieldError) document.getElementById(`auth-input-${mode}-${fieldError}`)?.focus({ preventScroll: true });
  }, [mode, fieldError]);

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
      <button
        type={`button`}
        id={`auth-skip-link-${mode}`}
        className={`auth-skip-link`}
        onClick={() => {
          smoothScrollToElement(`#auth-main-${mode}`);
          document.getElementById(`auth-main-${mode}`)?.focus({ preventScroll: true });
        }}
      >
        {`Skip to ${content.label.toLowerCase()} form`}
      </button>
      <div id={`auth-page-${mode}`} className={`auth-page`}>
        <div id={`auth-page-shell-${mode}`} className={`auth-page__shell`}>
          <SiteHeader />
          <main id={`auth-main-${mode}`} className={`auth-main`} tabIndex={-1}>
            <section
              id={`auth-panel-${mode}`}
              className={`auth-panel`}
              aria-labelledby={`auth-heading-${mode}`}
            >
              <AuthStory scope={mode} />
              <div id={`auth-content-${mode}`} className={`auth-panel__content`}>
                <nav
                  id={`auth-mode-navigation-${mode}`}
                  className={`auth-mode-navigation`}
                  aria-label={`Account access`}
                >
                  {([`sign-in`, `sign-up`] as const).map((item) => (
                    <Link
                      key={item}
                      href={item === `sign-in` ? `/sign-in` : `/sign-up`}
                      aria-disabled={pending}
                      aria-current={mode === item ? `page` : undefined}
                      id={`auth-mode-link-${mode}-${item}`}
                      className={`auth-mode-navigation__link${mode === item ? ` auth-mode-navigation__link--active` : ``}`}
                      onClick={(event) => { if (pending) event.preventDefault(); }}
                    >
                      <Icon
                        size={15}
                        name={item === `sign-in` ? `log-in` : `user-plus`}
                        id={`auth-mode-icon-${mode}-${item}`}
                        className={`auth-mode-navigation__icon`}
                      />
                      <span id={`auth-mode-label-${mode}-${item}`} className={`auth-mode-navigation__label`}>
                        {item === `sign-in` ? `Sign In` : `Create Account`}
                      </span>
                    </Link>
                  ))}
                </nav>
                {signingUp && (
                  <div id={`auth-progress-${mode}`} className={`auth-progress`}>
                    <p
                      role={`status`}
                      aria-live={`polite`}
                      id={`auth-progress-label-${mode}`}
                      className={`auth-progress__label`}
                    >
                      {progressLabel}
                    </p>
                    <ol id={`auth-progress-steps-${mode}`} className={`auth-progress__steps`}>
                      {steps.map((item, index) => (
                        <li
                          key={item.id}
                          aria-current={step === index ? `step` : undefined}
                          id={`auth-progress-step-${mode}-${item.id}`}
                          className={`auth-progress__step${index <= step ? ` auth-progress__step--active` : ``}`}
                        >
                          <span id={`auth-progress-number-${mode}-${item.id}`} className={`auth-progress__number`}>
                            {index < step ? (
                              <Icon
                                size={12}
                                name={`check`}
                                id={`auth-progress-check-${mode}-${item.id}`}
                                className={`auth-progress__check`}
                              />
                            ) : index + 1}
                          </span>
                          <span id={`auth-progress-text-${mode}-${item.id}`} className={`auth-progress__text`}>
                            {item.label}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                <div key={`${mode}-${step}`} id={`auth-step-${mode}-${step}`} className={`auth-step`}>
                  <p id={`auth-eyebrow-${mode}`} className={`auth-panel__eyebrow dd-eyebrow`}>
                    <Icon
                      size={15}
                      name={`sparkles`}
                      id={`auth-eyebrow-icon-${mode}`}
                      className={`auth-panel__eyebrow-icon`}
                    />
                    {`A little curiosity goes a long way`}
                  </p>
                  <h1 id={`auth-heading-${mode}`} className={`auth-panel__heading`}>
                    {heading}
                  </h1>
                  <p id={`auth-description-${mode}`} className={`auth-panel__description`}>
                    {description}
                  </p>
                  {!ready ? (
                    <div
                      role={`status`}
                      aria-busy={true}
                      id={`auth-loading-${mode}`}
                      className={`auth-loading`}
                      aria-label={`Loading your account`}
                    >
                      {[`field`, `button`].map((item) => (
                        <div
                          key={item}
                          aria-hidden={true}
                          id={`auth-skeleton-${mode}-${item}`}
                          className={`auth-loading__skeleton`}
                        />
                      ))}
                    </div>
                  ) : (
                    <form
                      noValidate
                      aria-busy={pending}
                      id={`auth-form-${mode}`}
                      className={`auth-form`}
                      aria-describedby={`auth-demo-notice-${mode}`}
                      onSubmit={(event) => { event.preventDefault(); void submit(); }}
                    >
                      {fields.map((field) => {
                        const password = field.id === `password` || field.id === `confirmPassword`;
                        return (
                          <div key={field.id} id={`auth-field-${mode}-${field.id}`} className={`auth-form__field`}>
                            <label
                              htmlFor={`auth-input-${mode}-${field.id}`}
                              id={`auth-label-${mode}-${field.id}`}
                              className={`auth-form__label`}
                            >
                              {field.label}
                            </label>
                            <div id={`auth-input-frame-${mode}-${field.id}`} className={`auth-form__input-frame`}>
                              <Icon
                                size={17}
                                name={field.icon}
                                id={`auth-input-icon-${mode}-${field.id}`}
                                className={`auth-form__input-icon`}
                              />
                              <input
                                required
                                name={field.id}
                                disabled={disabled}
                                spellCheck={false}
                                value={values[field.id]}
                                maxLength={field.id === `name` ? 80 : undefined}
                                id={`auth-input-${mode}-${field.id}`}
                                className={`auth-form__input`}
                                aria-invalid={fieldError === field.id}
                                aria-describedby={fieldError === field.id ? `auth-form-error-${mode}` : undefined}
                                autoCapitalize={field.id === `name` ? `words` : `none`}
                                type={password ? showPassword ? `text` : `password` : field.id === `email` ? `email` : `text`}
                                placeholder={!signingUp && password ? `Enter your password` : field.placeholder}
                                autoComplete={password ? signingUp ? `new-password` : `current-password` : field.autoComplete}
                                onChange={(event) => updateField(field.id, event.target.value)}
                              />
                              {field.id === `password` && (
                                <button
                                  type={`button`}
                                  disabled={disabled}
                                  onClick={togglePassword}
                                  aria-pressed={showPassword}
                                  id={`auth-password-toggle-${mode}`}
                                  className={`auth-form__password-toggle`}
                                  aria-label={showPassword ? `Hide passwords` : `Show passwords`}
                                >
                                  <Icon
                                    size={14}
                                    name={`shield`}
                                    id={`auth-password-toggle-icon-${mode}`}
                                    className={`auth-form__password-toggle-icon`}
                                  />
                                  <span id={`auth-password-toggle-label-${mode}`} className={`auth-form__password-toggle-label`}>
                                    {showPassword ? `Hide` : `Show`}
                                  </span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      {error ? (
                        <p role={`alert`} id={`auth-form-error-${mode}`} className={`auth-form__error`}>
                          <Icon
                            size={16}
                            name={`info`}
                            id={`auth-error-icon-${mode}`}
                            className={`auth-form__error-icon`}
                          />
                          <span id={`auth-error-label-${mode}`} className={`auth-form__error-label`}>
                            {error}
                          </span>
                        </p>
                      ) : null}
                      <div id={`auth-form-actions-${mode}`} className={`auth-form__actions`}>
                        {signingUp && step > 0 && (
                          <button
                            type={`button`}
                            onClick={back}
                            disabled={disabled}
                            id={`auth-back-button-${mode}`}
                            className={`auth-form__back dd-button dd-button--secondary`}
                          >
                            <Icon
                              size={16}
                              name={`arrow-right`}
                              id={`auth-back-icon-${mode}`}
                              className={`auth-form__back-icon`}
                            />
                            <span id={`auth-back-label-${mode}`} className={`auth-form__back-label`}>
                              {`Back`}
                            </span>
                          </button>
                        )}
                        <button
                          type={`submit`}
                          disabled={disabled}
                          aria-busy={pending}
                          id={`auth-submit-button-${mode}`}
                          className={`auth-form__button dd-button dd-button--primary`}
                        >
                          <span id={`auth-submit-label-${mode}`} className={`auth-form__button-label`}>
                            {submitLabel}
                          </span>
                          <Icon
                            size={17}
                            name={`arrow-right`}
                            id={`auth-submit-icon-${mode}`}
                            className={`auth-form__button-icon`}
                          />
                        </button>
                      </div>
                    </form>
                  )}
                </div>
                <div id={`auth-switch-${mode}`} className={`auth-switch`}>
                  <p id={`auth-switch-prompt-${mode}`} className={`auth-switch__prompt`}>
                    {content.switchPrompt}
                  </p>
                  <Link
                    href={switchHref}
                    aria-disabled={pending}
                    id={`auth-switch-link-${mode}`}
                    className={`auth-switch__link`}
                    onClick={(event) => { if (pending) event.preventDefault(); }}
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
                <p id={`auth-demo-notice-${mode}`} className={`auth-panel__notice`}>
                  <Icon
                    size={15}
                    name={`shield`}
                    id={`auth-demo-notice-icon-${mode}`}
                    className={`auth-panel__notice-icon`}
                  />
                  <span id={`auth-demo-notice-label-${mode}`} className={`auth-panel__notice-label`}>
                    {authDemoNotice}
                  </span>
                </p>
                <div id={`auth-policy-links-${mode}`} className={`auth-policy-links`}>
                  {([`terms`, `privacy`] as const).map((page) => (
                    <Link
                      key={page}
                      href={page === `terms` ? `/terms` : `/privacy`}
                      id={`auth-policy-link-${mode}-${page}`}
                      className={`auth-policy-links__link`}
                    >
                      <Icon
                        size={12}
                        name={page === `terms` ? `file-text` : `shield`}
                        id={`auth-policy-icon-${mode}-${page}`}
                        className={`auth-policy-links__icon`}
                      />
                      <span id={`auth-policy-label-${mode}-${page}`} className={`auth-policy-links__label`}>
                        {page === `terms` ? `Terms` : `Privacy`}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </main>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}
