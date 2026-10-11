import { getDirectoryHref, getDirectoryDescription } from './directoryDetails';
import { categories, type DirectoryEntry } from './catalog';

const siteUrl = process.env.EXPO_PUBLIC_SITE_URL?.trim()?.replace(/\/+$/, ``) ?? ``;
const absoluteUrl = (path: string) => /^https?:\/\//i.test(path) ? path : siteUrl ? `${siteUrl}${path}` : undefined;

export const getDirectoryMetadata = (directory: DirectoryEntry) => {
  const path = getDirectoryHref(directory);
  const category = categories.find((item) => item.id === directory.category);
  const canonical = absoluteUrl(path);
  const description = getDirectoryDescription(directory);
  const title = `${directory.name}: Directory Details & Reviews — Directory Directory`;
  const image = directory.previewImage ? absoluteUrl(directory.previewImage) : undefined;
  const schema = {
    '@context': `https://schema.org`,
    '@graph': [
      {
        url: canonical ?? path,
        name: title,
        '@type': `WebPage`,
        description,
        inLanguage: `en-US`,
        keywords: [category?.label, ...directory.topics].filter(Boolean).join(`, `),
        ...(image ? { primaryImageOfPage: { '@type': `ImageObject`, url: image } } : {}),
        mainEntity: { '@type': `WebSite`, name: directory.name, url: directory.href, description },
        publisher: { '@type': `Organization`, name: `Directory Directory`, ...(siteUrl ? { url: siteUrl } : {}) },
      },
      ...(canonical ? [{
        '@type': `BreadcrumbList`,
        itemListElement: [
          { '@type': `ListItem`, position: 1, name: `Home`, item: absoluteUrl(`/`) },
          { '@type': `ListItem`, position: 2, name: `Directories`, item: absoluteUrl(`/discover`) },
          { '@type': `ListItem`, position: 3, name: directory.name, item: canonical },
        ],
      }] : []),
    ],
  };
  return { title, image, schema, canonical, description };
};
