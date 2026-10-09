import './BlogCard.scss';
import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import type { CSSProperties } from 'react';
import { formatBlogDate } from './formatBlogDate';
import type { BlogCardProps } from './BlogCard.types';
import { getBlogCardAccent } from '../../shared/blog/accents';

const BlogCard = ({ scope, article }: BlogCardProps) => {
  const id = `${scope}-${article.id}`;
  const { color } = getBlogCardAccent(article.id);

  return (
    <article id={`blog-card-${id}`} className={`blog-card`} style={{ [`--blog-color`]: color } as CSSProperties} aria-labelledby={`blog-card-title-${id}`}>
      <span aria-hidden={true} id={`blog-card-tab-${id}`} className={`blog-card__tab`} />
      <div id={`blog-card-top-${id}`} className={`blog-card__top`}>
        <span id={`blog-card-symbol-${id}`} className={`blog-card__symbol`}>
          <Icon size={23} name={`file-text`} id={`blog-card-symbol-icon-${id}`} className={`blog-card__symbol-icon`} />
        </span>
        <p id={`blog-card-category-${id}`} className={`blog-card__category dd-eyebrow`}>{article.category}</p>
      </div>
      <h3 id={`blog-card-title-${id}`} className={`blog-card__title`}>
        <Link href={`/blog/${article.slug}`} id={`blog-card-title-link-${id}`} className={`blog-card__title-link`}>{article.title}</Link>
      </h3>
      <p id={`blog-card-excerpt-${id}`} className={`blog-card__excerpt`}>{article.excerpt}</p>
      <div id={`blog-card-meta-${id}`} className={`blog-card__meta`}>
        <time dateTime={article.datePublished} id={`blog-card-date-${id}`} className={`blog-card__date`}>{formatBlogDate(article.datePublished)}</time>
        <span id={`blog-card-reading-${id}`} className={`blog-card__reading`}>{`${article.readMinutes} min read`}</span>
      </div>
      <Link href={`/blog/${article.slug}`} id={`blog-card-read-${id}`} className={`blog-card__read`} aria-label={`Read ${article.title}`}>
        <span id={`blog-card-read-label-${id}`} className={`blog-card__read-label`}>{`Read Article`}</span>
        <Icon size={15} name={`arrow-right`} id={`blog-card-read-icon-${id}`} className={`blog-card__read-icon`} />
      </Link>
    </article>
  );
};

export default BlogCard;
