import './AuthActions.scss';
import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import { useEffect, useRef } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import type { AuthActionsProps } from './AuthActions.types';
import { authLinks, useAuthActions } from './useAuthActions';

export default function AuthActions({ scope }: AuthActionsProps) {
  const state = useAuthActions();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const options = useRef<HTMLDivElement>(null);
  const { user, open, ready, error, busy } = state;

  useEffect(() => {
    if (!open) return;

    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) {
        state.setOpen(false);
      }
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== `Escape`) return;
      state.setOpen(false);
      trigger.current?.focus();
    };

    document.addEventListener(`pointerdown`, dismiss);
    document.addEventListener(`keydown`, escape);
    return () => {
      document.removeEventListener(`pointerdown`, dismiss);
      document.removeEventListener(`keydown`, escape);
    };
  }, [open, state.setOpen]);

  const handleMenuKeys = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (![ `ArrowDown`, `ArrowUp`, `Home`, `End` ].includes(event.key)) return;
    if (!user || (!open && event.key !== `ArrowDown` && event.key !== `ArrowUp`)) return;
    event.preventDefault();
    state.setOpen(true);

    requestAnimationFrame(() => {
      const items = Array.from(options.current?.querySelectorAll<HTMLElement>(`[role='menuitem']`) ?? []);
      if (!items.length) return;
      const current = items.indexOf(document.activeElement as HTMLElement);
      const last = items.length - 1;
      const next = event.key === `Home` ? 0 : event.key === `End` ? last
        : event.key === `ArrowUp` ? (current <= 0 ? last : current - 1)
          : (current + 1) % items.length;
      items[next]?.focus();
    });
  };

  return (
    <div
      ref={root}
      onKeyDown={handleMenuKeys}
      id={`${scope}-auth-actions`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) state.closeMenu();
      }}
      className={`auth-actions${user || !ready ? ` auth-actions--signed-in` : ``}`}
    >
      {!ready ? (
        <span
          role={`status`}
          aria-label={`Loading account`}
          id={`${scope}-auth-loading`}
          className={`auth-actions__skeleton`}
        />
      ) : user ? (
        <>
          <button
            ref={trigger}
            type={`button`}
            disabled={busy}
            aria-haspopup={`menu`}
            aria-expanded={open}
            onClick={state.toggleMenu}
            id={`${scope}-user-menu-button`}
            className={`auth-actions__avatar-button`}
            aria-controls={`${scope}-user-menu-options`}
            aria-label={`${user.name} account menu`}
          >
            {user.photoURL ? (
              <img
                alt={user.name}
                src={user.photoURL}
                id={`${scope}-user-avatar`}
                className={`auth-actions__avatar`}
              />
            ) : (
              <span
                aria-hidden={true}
                id={`${scope}-user-avatar`}
                className={`auth-actions__avatar auth-actions__avatar--initial`}
                style={{ color: state.avatarTextColor, backgroundColor: state.avatarColor }}
              >
                {state.avatarInitial}
              </span>
            )}
          </button>
          {open && (
            <div
              ref={options}
              role={`menu`}
              aria-label={`Account`}
              id={`${scope}-user-menu-options`}
              className={`auth-actions__menu`}
            >
              <div id={`${scope}-user-menu-heading`} className={`auth-actions__heading`}>
                <strong id={`${scope}-user-menu-name`} className={`auth-actions__name`}>
                  {user.name}
                </strong>
                <span id={`${scope}-user-menu-email`} className={`auth-actions__email`}>
                  {user.email}
                </span>
              </div>
              <Link
                role={`menuitem`}
                href={state.profileRoute.href}
                onClick={state.closeMenu}
                id={`${scope}-user-menu-profile`}
                className={`auth-actions__menu-item`}
              >
                <Icon name={state.profileRoute.icon} id={`${scope}-user-menu-profile-icon`} size={16} />
                <span id={`${scope}-user-menu-profile-label`} className={`auth-actions__label`}>
                  {state.profileRoute.label}
                </span>
              </Link>
              {error && (
                <p role={`alert`} id={`${scope}-auth-error`} className={`auth-actions__error`}>
                  {error}
                </p>
              )}
              <button
                type={`button`}
                disabled={busy}
                role={`menuitem`}
                onClick={state.handleSignOut}
                id={`${scope}-user-menu-sign-out`}
                className={`auth-actions__menu-item auth-actions__menu-item--sign-out`}
              >
                <Icon name={`log-out`} id={`${scope}-user-menu-sign-out-icon`} size={16} />
                <span id={`${scope}-user-menu-sign-out-label`} className={`auth-actions__label`}>
                  {busy ? `Signing out…` : `Sign Out`}
                </span>
              </button>
            </div>
          )}
        </>
      ) : authLinks.map((link) => (
        <Link
          key={link.id}
          id={`${scope}-${link.id}`}
          href={{ pathname: link.pathname, params: { redirect: state.redirect } }}
          className={`auth-actions__link auth-actions__link--${link.id} dd-button dd-button--${link.id === `sign-up` ? `primary` : `secondary`}`}
        >
          <Icon name={link.icon} id={`${scope}-${link.id}-icon`} size={15} />
          <span id={`${scope}-${link.id}-label`} className={`auth-actions__label`}>
            {link.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
