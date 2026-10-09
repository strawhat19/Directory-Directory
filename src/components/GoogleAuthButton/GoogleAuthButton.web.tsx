import './GoogleAuthButton.scss';
import type { GoogleAuthButtonProps } from './GoogleAuthButton.types';

const GoogleAuthButton = ({ mode }: GoogleAuthButtonProps) => {
  const label = mode === `sign-up` ? `Sign up with Google` : `Sign in with Google`;

  return (
    <div id={`auth-google-option-${mode}`} className={`google-auth-option`}>
      <button
        disabled
        type={`button`}
        title={`Google sign-in is coming soon`}
        id={`auth-google-button-${mode}`}
        className={`google-auth-option__button`}
        aria-describedby={`auth-google-notice-${mode}`}
      >
        <img alt={``} width={20} height={20} src={`/brand/google-g.png`} id={`auth-google-logo-${mode}`} className={`google-auth-option__logo`} />
        <span id={`auth-google-label-${mode}`} className={`google-auth-option__label`}>{label}</span>
      </button>
      <p id={`auth-google-notice-${mode}`} className={`google-auth-option__notice`}>{`Google sign-in is coming soon.`}</p>
      <div id={`auth-google-divider-${mode}`} className={`google-auth-option__divider`}>
        <span aria-hidden={true} id={`auth-google-divider-line-${mode}-before`} className={`google-auth-option__divider-line`} />
        <span id={`auth-google-divider-label-${mode}`} className={`google-auth-option__divider-label`}>{`Or continue with email`}</span>
        <span aria-hidden={true} id={`auth-google-divider-line-${mode}-after`} className={`google-auth-option__divider-line`} />
      </div>
    </div>
  );
};

export default GoogleAuthButton;
