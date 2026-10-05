export const authRoutes = {
  signIn: { href: `/sign-in`, icon: `log-in`, label: `Sign In`, minimumRole: null },
  signUp: { href: `/sign-up`, icon: `user-plus`, label: `Sign Up`, minimumRole: null },
  profile: { href: `/profile`, icon: `user`, label: `Profile`, minimumRole: `Subscriber` },
} as const;
