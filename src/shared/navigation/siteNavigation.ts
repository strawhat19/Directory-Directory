export const siteNavigation = [
  { id: `about`, tone: `blue`, href: `/about`, label: `About`, icon: `info`, color: `#0874f9` },
  { id: `blog`, tone: `green`, href: `/blog`, label: `Blog`, icon: `learning`, color: `#21a668` },
  { id: `api`, tone: `red`, href: `/api`, label: `API`, icon: `technology`, color: `#d83b42` },
  { id: `docs`, tone: `purple`, href: `/docs`, label: `Docs`, icon: `learning`, color: `#8054d7` },
  { id: `discover`, tone: `blue`, href: `/discover`, label: `Discover`, icon: `sparkles`, color: `#0874f9` },
  { id: `pricing`, tone: `green`, href: `/pricing`, label: `Pricing`, icon: `business`, color: `#21a668` },
  { id: `terms`, tone: `red`, href: `/terms`, label: `Terms`, icon: `file-text`, color: `#d83b42` },
  { id: `privacy`, tone: `purple`, href: `/privacy`, label: `Privacy`, icon: `shield`, color: `#8054d7` },
  { id: `contact`, tone: `blue`, href: `/contact`, label: `Contact`, icon: `mail`, color: `#0874f9` },
] as const;

export type SiteNavigationId = typeof siteNavigation[number][`id`];

export const getPageNavigation = (page: SiteNavigationId) =>
  siteNavigation.find((item) => item.id === page) ?? siteNavigation[0];
