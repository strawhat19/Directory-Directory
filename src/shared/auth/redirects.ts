const redirectPages = [`/`, `/about`, `/terms`, `/privacy`, `/contact`];

export function getAuthRedirect(value: string | string[] | undefined) {
  const redirect = Array.isArray(value) ? value[0] : value;

  return redirect && redirectPages.includes(redirect) ? redirect : `/`;
}
