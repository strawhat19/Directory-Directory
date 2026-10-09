import './FeaturedArticle.scss';
import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import { formatBlogDate } from '../BlogCard/formatBlogDate';
import { featuredArticle } from '../../shared/blog/articles';
import BlogStoryArtwork from '../BlogStoryArtwork/BlogStoryArtwork';
import type { FeaturedArticleProps } from './FeaturedArticle.types';

const FeaturedArticle = ({ scope, backgroundColor, fullBleed = false, showBlogLink = true, article = featuredArticle }: FeaturedArticleProps) => {
  const isFeatured = article.id === featuredArticle.id;
  const story = (
  <section id={`featured-article-${scope}`} className={`featured-article`} aria-labelledby={`featured-article-title-${scope}`}>
    <Link href={`/blog/${article.slug}`} id={`featured-article-image-link-${scope}`} className={`featured-article__image-link`} aria-label={`Read ${article.title}`}>
      {isFeatured ? <img
        width={1536}
        height={1024}
        loading={`lazy`}
        decoding={`async`}
        src={`/blog/directory-history.png`}
        id={`featured-article-image-${scope}`}
        className={`featured-article__image`}
        alt={`Printed directories and address books beside a laptop showing a modern online directory`}
      /> : <BlogStoryArtwork article={article} scope={scope} />}
      <span id={`featured-article-image-label-${scope}`} className={`featured-article__image-label`}>
        <Icon size={14} name={`learning`} id={`featured-article-image-icon-${scope}`} className={`featured-article__image-icon`} />
        <span id={`featured-article-image-label-text-${scope}`} className={`featured-article__image-label-text`}>{isFeatured ? `From Paper to Pixels` : article.category}</span>
      </span>
    </Link>
    <div id={`featured-article-copy-${scope}`} className={`featured-article__copy`}>
      <p id={`featured-article-eyebrow-${scope}`} className={`featured-article__eyebrow dd-eyebrow`}>
        <Icon size={15} name={`star`} id={`featured-article-eyebrow-icon-${scope}`} className={`featured-article__eyebrow-icon`} />
        <span id={`featured-article-eyebrow-label-${scope}`} className={`featured-article__eyebrow-label`}>{isFeatured ? `Featured Story` : `From the Blog`}</span>
      </p>
      <h2 id={`featured-article-title-${scope}`} className={`featured-article__title`}>
        <Link href={`/blog/${article.slug}`} id={`featured-article-title-link-${scope}`} className={`featured-article__title-link`}>{article.title}</Link>
      </h2>
      <p id={`featured-article-excerpt-${scope}`} className={`featured-article__excerpt`}>{article.excerpt}</p>
      <p id={`featured-article-meta-${scope}`} className={`featured-article__meta`}>
        <time dateTime={article.datePublished} id={`featured-article-date-${scope}`} className={`featured-article__date`}>{formatBlogDate(article.datePublished)}</time>
        <span id={`featured-article-reading-${scope}`} className={`featured-article__reading`}>{`${article.readMinutes} min read`}</span>
      </p>
      <div id={`featured-article-actions-${scope}`} className={`featured-article__actions`}>
        <Link href={showBlogLink ? `/blog` : `/blog/${article.slug}`} id={`featured-article-primary-link-${scope}`} className={`featured-article__blog-link dd-button dd-button--primary`}>
          <Icon size={16} name={showBlogLink ? `file-text` : `arrow-right`} id={`featured-article-primary-icon-${scope}`} className={`featured-article__blog-icon`} />
          <span id={`featured-article-primary-label-${scope}`} className={`featured-article__blog-label`}>{showBlogLink ? `Explore the Blog` : `Read the Story`}</span>
        </Link>
        {showBlogLink ? (
          <Link href={`/blog/${article.slug}`} id={`featured-article-read-link-${scope}`} className={`featured-article__read-link`}>
            <span id={`featured-article-read-label-${scope}`} className={`featured-article__read-label`}>{`Read the Story`}</span>
            <Icon size={15} name={`arrow-right`} id={`featured-article-read-icon-${scope}`} className={`featured-article__read-icon`} />
          </Link>
        ) : null}
      </div>
    </div>
  </section>
  );

  return fullBleed ? (
    <div style={{ backgroundColor }} id={`featured-story-${scope}`} className={`featured-story`}>
      <div id={`featured-story-content-${scope}`} className={`featured-story__content`}>
        {story}
      </div>
    </div>
  ) : story;
};

export default FeaturedArticle;
