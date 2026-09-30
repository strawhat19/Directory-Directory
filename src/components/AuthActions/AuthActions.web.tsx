import './AuthActions.scss';
import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import type { AuthActionsProps } from './AuthActions.types';
import { authLinks, useAuthActions } from './useAuthActions';

export default function AuthActions({ scope }: AuthActionsProps) {
  const { user, ready, error, busy, redirect, handleSignOut } = useAuthActions();

  return (
    <div id={`${scope}-auth-actions`} className={`auth-actions`}>
      {ready && user ? (
        <>
          <span id={`${scope}-auth-name`} className={`auth-actions__name`}>
            {user.name}
          </span>
          <button
            type={`button`}
            disabled={busy}
            onClick={handleSignOut}
            id={`${scope}-sign-out`}
            className={`auth-actions__link dd-button dd-button--secondary`}
          >
            <Icon name={`log-out`} id={`${scope}-sign-out-icon`} size={15} />
            <span id={`${scope}-sign-out-label`} className={`auth-actions__label`}>
              {busy ? `Signing out…` : `Sign out`}
            </span>
          </button>
        </>
      ) : authLinks.map((link) => (
        <Link
          key={link.id}
          id={`${scope}-${link.id}`}
          href={{ pathname: link.pathname, params: { redirect } }}
          className={`auth-actions__link auth-actions__link--${link.id} dd-button dd-button--${link.id === `sign-up` ? `primary` : `secondary`}`}
        >
          <Icon name={link.icon} id={`${scope}-${link.id}-icon`} size={15} />
          <span id={`${scope}-${link.id}-label`} className={`auth-actions__label`}>
            {link.label}
          </span>
        </Link>
      ))}
      {error && (
        <p role={`status`} id={`${scope}-auth-error`} className={`auth-actions__error`}>
          {error}
        </p>
      )}
    </div>
  );
}
