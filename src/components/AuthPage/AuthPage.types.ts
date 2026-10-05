export type AuthMode = `sign-in` | `sign-up`;
export type AuthField = `name` | `email` | `password` | `confirmPassword`;

export type AuthPageProps = {
    mode: AuthMode;
};
