import type { DirectoryEntry } from './catalog';

export const getDirectoryHref = (directory: DirectoryEntry) => `/directory/${directory.id}` as const;

export const getDirectoryDescription = (directory: DirectoryEntry) => {
  const label = directory.label.trim();
  const summary = directory.summary.trim();
  return label && summary ? `${label}${/[.!?]$/.test(label) ? `` : `.`} ${summary}` : label || summary;
};

export const getDirectoryDomain = (href: string) => {
  try {
    const host = new URL(href).hostname.replace(/^www\./i, ``);
    const parts = host.split(`.`);
    if (parts.length < 2 || /^\d+(?:\.\d+){3}$/.test(host) || host.includes(`:`)) return { host, name: host, extension: `` };
    const final = parts?.[parts.length - 1] ?? ``;
    const previous = parts?.[parts.length - 2] ?? ``;
    const countrySuffix = final.length === 2 && [`ac`, `co`, `com`, `edu`, `gov`, `net`, `org`].includes(previous);
    const suffixLength = countrySuffix && parts.length > 2 ? 2 : 1;
    return { host, name: parts.slice(0, -suffixLength).join(`.`), extension: `.${parts.slice(-suffixLength).join(`.`)}` };
  } catch {
    return { host: ``, name: ``, extension: `` };
  }
};
