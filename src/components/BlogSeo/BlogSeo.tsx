import Head from 'expo-router/head';
import { getBlogMetadata } from '../../shared/blog/seo';
import type { BlogArticle } from '../../shared/blog/articles';

export default function BlogSeo({ article }: { article?: BlogArticle }) {
  const { image, title, description, schema, shareUrl, canonicalUrl } = getBlogMetadata(article);
  const scope = article?.slug ?? `index`;
  const metadataProps = (name: string) => ({ id: `blog-${name}-${scope}`, className: `blog-${name}` });

  return (
    <Head>
      <title id={`blog-title-${scope}`} className={`blog-title`}>{title}</title>
      <meta {...metadataProps(`description`)} name={`description`} content={description} />
      <link {...metadataProps(`canonical`)} rel={`canonical`} href={canonicalUrl} />
      {shareUrl ? <meta {...metadataProps(`og-url`)} property={`og:url`} content={shareUrl} /> : null}
      <meta {...metadataProps(`og-title`)} property={`og:title`} content={title} />
      <meta {...metadataProps(`og-locale`)} property={`og:locale`} content={`en_US`} />
      <meta {...metadataProps(`og-description`)} property={`og:description`} content={description} />
      <meta {...metadataProps(`og-site-name`)} property={`og:site_name`} content={`Directory Directory`} />
      <meta {...metadataProps(`og-type`)} property={`og:type`} content={article ? `article` : `website`} />
      <meta {...metadataProps(`twitter-title`)} name={`twitter:title`} content={title} />
      <meta {...metadataProps(`twitter-description`)} name={`twitter:description`} content={description} />
      <meta {...metadataProps(`twitter-card`)} name={`twitter:card`} content={image ? `summary_large_image` : `summary`} />
      {image ? <meta {...metadataProps(`og-image`)} property={`og:image`} content={image} /> : null}
      {image ? <meta {...metadataProps(`twitter-image`)} name={`twitter:image`} content={image} /> : null}
      {image ? <meta {...metadataProps(`og-image-width`)} property={`og:image:width`} content={`1536`} /> : null}
      {image ? <meta {...metadataProps(`og-image-height`)} property={`og:image:height`} content={`1024`} /> : null}
      {image ? <meta {...metadataProps(`og-image-alt`)} property={`og:image:alt`} content={`Printed directories and index cards beside a laptop displaying an online resource collection`} /> : null}
      {article ? <meta {...metadataProps(`published-time`)} property={`article:published_time`} content={article.datePublished} /> : null}
      {article ? <meta {...metadataProps(`article-section`)} property={`article:section`} content={article.category} /> : null}
      <script
        type={`application/ld+json`}
        id={`blog-schema-${scope}`}
        className={`blog-schema`}
      >
        {JSON.stringify(schema).replace(/</g, `\\u003c`)}
      </script>
    </Head>
  );
}
