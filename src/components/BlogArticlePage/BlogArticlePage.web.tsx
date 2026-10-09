import './BlogArticlePage.scss';
import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import Head from 'expo-router/head';
import BlogSeo from '../BlogSeo/BlogSeo';
import PageCta from '../PageCta/PageCta';
import BlogCard from '../BlogCard/BlogCard';
import BlogLayout from '../BlogLayout/BlogLayout';
import PageEyebrow from '../PageEyebrow/PageEyebrow';
import { formatBlogDate } from '../BlogCard/formatBlogDate';
import { getArticleCta } from '../../shared/cta/pageCtas';
import type { BlogArticlePageProps } from './BlogArticlePage.types';
import { smoothScrollToElement } from '../../shared/navigation/smoothScrollToElement';
import { featuredArticle, getBlogArticle, getRelatedArticles } from '../../shared/blog/articles';

const BlogArticlePage = ({ slug }: BlogArticlePageProps) => {
  const article = getBlogArticle(slug);
  const scope = article?.slug ?? `missing`;
  const backLink = (
    <Link href={`/blog`} id={`blog-article-back-${scope}`} className={`blog-back-link`}>
      <Icon size={14} name={`file-text`} id={`blog-article-back-icon-${scope}`} className={`blog-back-link__icon`} />
      <span id={`blog-article-back-label-${scope}`} className={`blog-back-link__label`}>{`Back to the Blog`}</span>
    </Link>
  );

  if (!article) return (
    <>
      <Head>
        <title id={`blog-missing-title`} className={`blog-missing-title`}>{`Article Not Found — Directory Directory`}</title>
        <meta name={`robots`} content={`noindex`} id={`blog-missing-robots`} className={`blog-missing-robots`} />
      </Head>
      <BlogLayout scope={scope} hero={(
        <>
          {backLink}
          <PageEyebrow page={`blog`} className={`blog-eyebrow`} label={`The Directory Journal`} id={`blog-article-eyebrow-${scope}`} />
          <h1 id={`blog-heading-${scope}`} className={`blog-heading`}>{`This Article Couldn't Be Found`}</h1>
          <p id={`blog-missing-summary`} className={`blog-summary`}>{`Browse the journal to find stories and guides about directories, resources, and discovery.`}</p>
        </>
      )}>
        <Link href={`/blog`} id={`blog-missing-link`} className={`blog-action`}>
          <span id={`blog-missing-label`} className={`blog-action__label`}>{`Explore the Blog`}</span>
          <Icon size={16} name={`arrow-right`} id={`blog-missing-icon`} className={`blog-action__icon`} />
        </Link>
      </BlogLayout>
    </>
  );

  return (
    <>
      <BlogSeo article={article} />
      <BlogLayout article scope={scope} hero={(
        <>
          {backLink}
          <PageEyebrow
            page={`blog`}
            label={article.category}
            className={`blog-eyebrow`}
            id={`blog-article-eyebrow-${scope}`}
            labelId={`blog-article-category-${scope}`}
            iconId={`blog-article-eyebrow-icon-${scope}`}
          />
          <h1 id={`blog-heading-${scope}`} className={`blog-heading`}>{article.title}</h1>
          <p id={`blog-article-summary-${scope}`} className={`blog-summary`}>{article.excerpt}</p>
          <div id={`blog-article-meta-${scope}`} className={`blog-meta blog-article__meta`}>
            <span id={`blog-article-byline-${scope}`} className={`blog-meta__item`}>{`By Directory Directory`}</span>
            <time dateTime={article.datePublished} id={`blog-article-date-${scope}`} className={`blog-meta__item`}>{formatBlogDate(article.datePublished)}</time>
            <span id={`blog-article-reading-${scope}`} className={`blog-meta__item`}>
              <Icon size={13} name={`clock`} id={`blog-article-clock-${scope}`} className={`blog-meta__icon`} />
              <span id={`blog-article-reading-label-${scope}`} className={`blog-meta__label`}>{`${article.readMinutes} min read`}</span>
            </span>
          </div>
        </>
      )}>
        {article.id === featuredArticle.id ? (
          <figure id={`blog-article-figure-${scope}`} className={`blog-article__figure`}>
            <img width={1536} height={1024} decoding={`async`} src={`/blog/directory-history.png`} id={`blog-article-image-${scope}`} className={`blog-article__image`} alt={`Printed directories and address books beside a laptop showing a modern online directory`} />
            <figcaption id={`blog-article-caption-${scope}`} className={`blog-article__caption`}>{`The format changed. The idea stayed familiar: organize resources so people can find a useful next step.`}</figcaption>
          </figure>
        ) : null}
        <div id={`blog-article-layout-${scope}`} className={`blog-article__layout`}>
          <aside id={`blog-article-sidebar-${scope}`} className={`blog-article__sidebar`}>
            <nav id={`blog-article-contents-${scope}`} className={`blog-article__contents`} aria-label={`Article contents`}>
              <p id={`blog-article-contents-label-${scope}`} className={`blog-article__contents-label dd-eyebrow`}>{`In This Article`}</p>
              {article.sections.map((section, index) => (
                <button key={section.id} type={`button`} id={`blog-article-contents-link-${scope}-${section.id}`} className={`blog-article__contents-link`} onClick={() => smoothScrollToElement(`#blog-article-section-${scope}-${section.id}`)}>
                  <span id={`blog-article-contents-number-${scope}-${section.id}`} className={`blog-article__contents-number`}>{String(index + 1).padStart(2, `0`)}</span>
                  <span id={`blog-article-contents-text-${scope}-${section.id}`} className={`blog-article__contents-text`}>{section.title}</span>
                </button>
              ))}
            </nav>
            <div id={`blog-article-tags-${scope}`} className={`blog-article__tags`} aria-label={`Article topics`}>
              {article.tags.map((tag) => <span key={tag} id={`blog-article-tag-${scope}-${tag}`} className={`blog-article__tag`}>{tag}</span>)}
            </div>
          </aside>
          <div id={`blog-article-prose-${scope}`} className={`blog-article__prose`}>
            {article.sections.map((section) => (
              <section key={section.id} id={`blog-article-section-${scope}-${section.id}`} className={`blog-article__section`} aria-labelledby={`blog-article-section-title-${scope}-${section.id}`}>
                <h2 id={`blog-article-section-title-${scope}-${section.id}`} className={`blog-article__section-title`}>{section.title}</h2>
                {section.paragraphs.map((paragraph, index) => <p key={index} id={`blog-article-paragraph-${scope}-${section.id}-${index}`} className={`blog-article__paragraph`}>{paragraph}</p>)}
              </section>
            ))}
            {article.sources?.length ? (
              <section id={`blog-article-sources-${scope}`} className={`blog-article__sources`} aria-labelledby={`blog-article-sources-heading-${scope}`}>
                <h2 id={`blog-article-sources-heading-${scope}`} className={`blog-article__section-title`}>{`Sources & Further Reading`}</h2>
                <ul id={`blog-article-sources-list-${scope}`} className={`blog-article__sources-list`}>
                  {article.sources.map((source, index) => (
                    <li key={source.url} id={`blog-article-source-${scope}-${index}`} className={`blog-article__source`}>
                      <a href={source.url} target={`_blank`} rel={`noopener noreferrer`} id={`blog-article-source-link-${scope}-${index}`} className={`blog-article__source-link`}>
                        <span id={`blog-article-source-label-${scope}-${index}`} className={`blog-article__source-label`}>{source.label}</span>
                        <Icon size={13} name={`arrow-up-right`} id={`blog-article-source-icon-${scope}-${index}`} className={`blog-article__source-icon`} />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </div>
        <PageCta content={getArticleCta(article)} />
        <section id={`blog-related-${scope}`} className={`blog-article__related`} aria-labelledby={`blog-related-heading-${scope}`}>
          <p id={`blog-related-eyebrow-${scope}`} className={`blog-article__related-eyebrow dd-eyebrow`}>{`Follow Your Curiosity`}</p>
          <h2 id={`blog-related-heading-${scope}`} className={`blog-article__related-heading`}>{`Related Articles`}</h2>
          <div id={`blog-related-grid-${scope}`} className={`blog-grid blog-article__related-grid`}>
            {getRelatedArticles(article).map((related) => <BlogCard key={related.id} article={related} scope={`related-${scope}`} />)}
          </div>
          <div id={`blog-article-browse-${scope}`} className={`blog-article__browse`}>
            <Link href={`/blog`} id={`blog-article-browse-blog-${scope}`} className={`blog-action`}>
              <Icon size={15} name={`file-text`} id={`blog-article-browse-blog-icon-${scope}`} className={`blog-action__icon`} />
              <span id={`blog-article-browse-blog-label-${scope}`} className={`blog-action__label`}>{`Browse All Articles`}</span>
            </Link>
          </div>
        </section>
      </BlogLayout>
    </>
  );
};

export default BlogArticlePage;
