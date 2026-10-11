import { directories } from '../catalog/catalog';

const redirectPages = [`/`, `/about`, `/terms`, `/privacy`, `/contact`];
const directoryPages = new Set(directories.map((directory) => `/directory/${directory.id}`));

export function getAuthRedirect(value: string | string[] | undefined) {
  const redirect = Array.isArray(value) ? value[0] : value;

  return redirect && (redirectPages.includes(redirect) || directoryPages.has(redirect)) ? redirect : `/`;
}
