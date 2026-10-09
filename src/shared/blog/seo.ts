import { blogArticles, featuredArticle, type BlogArticle } from './articles';

const siteUrl = process.env.EXPO_PUBLIC_SITE_URL?.trim()?.replace(/\/+$/, ``) ?? ``;
export const getBlogUrl = (path: string) => `${siteUrl}${path}`;

export const getBlogMetadata = (article?: BlogArticle) => {
  const path = article ? `/blog/${article.slug}` : `/blog`;
  const url = getBlogUrl(path);
  const hasImage = !article || article.slug === featuredArticle.slug;
  const image = hasImage && siteUrl ? getBlogUrl(`/blog/directory-history.png`) : undefined;
  const title = article ? `${article.title} — Directory Directory` : `Directory Blog: Guides, History & Discovery — Directory Directory`;
  const description = article?.description ?? `Learn what directories are, how they evolved from printed books to online collections, and how to discover useful resources by category.`;
  const breadcrumbs = [
    { name: `Home`, path: `/` },
    { name: `Blog`, path: `/blog` },
    ...(article ? [{ name: article.title, path }] : []),
  ];
  const schema = {
    '@context': `https://schema.org`,
    '@graph': [
      article ? {
        url,
        image,
        '@type': `BlogPosting`,
        inLanguage: `en-US`,
        headline: article.title,
        description,
        datePublished: article.datePublished,
        articleSection: article.category,
        keywords: article.tags.join(`, `),
        mainEntityOfPage: { '@type': `WebPage`, '@id': url },
        author: { '@type': `Organization`, name: `Directory Directory`, url: getBlogUrl(`/about`) },
        publisher: { '@type': `Organization`, name: `Directory Directory`, url: getBlogUrl(`/`) },
      } : {
        url,
        '@type': `Blog`,
        inLanguage: `en-US`,
        description,
        name: `Directory Directory Blog`,
        blogPost: blogArticles.map((post) => ({
          '@type': `BlogPosting`,
          headline: post.title,
          url: getBlogUrl(`/blog/${post.slug}`),
          datePublished: post.datePublished,
        })),
      },
      {
        '@type': `BreadcrumbList`,
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': `ListItem`,
          name: item.name,
          position: index + 1,
          item: getBlogUrl(item.path),
        })),
      },
    ],
  };

  return { image, title, description, schema, canonicalUrl: url, shareUrl: siteUrl ? url : undefined };
};
