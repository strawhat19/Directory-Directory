import './BlogStoryArtwork.scss';
import Icon from '../Icon/Icon';
import type { CSSProperties } from 'react';
import BrandMark from '../BrandMark/BrandMark';
import { getBlogStoryIcon } from './getBlogStoryIcon';
import { useTheme } from '../../shared/theme/useTheme';
import { getBlogCardAccent } from '../../shared/blog/accents';
import type { BlogStoryArtworkProps } from './BlogStoryArtwork.types';

const BlogStoryArtwork = ({ article, scope }: BlogStoryArtworkProps) => {
  const { isDark } = useTheme();
  const accent = getBlogCardAccent(article.id, isDark);
  const artworkId = `${scope}-${article.id}`;
  const artworkStyle = {
    [`--story-art-color`]: accent.color,
    [`--story-art-background`]: accent.background,
  } as CSSProperties;

  return (
    <div aria-hidden={true} style={artworkStyle} id={`blog-story-artwork-${artworkId}`} className={`blog-story-artwork`}>
      <div id={`blog-story-artwork-dots-${artworkId}`} className={`blog-story-artwork__dots`} />
      <div id={`blog-story-artwork-ring-${artworkId}`} className={`blog-story-artwork__ring`} />
      <div id={`blog-story-artwork-folder-back-${artworkId}`} className={`blog-story-artwork__folder blog-story-artwork__folder--back`} />
      <div id={`blog-story-artwork-folder-middle-${artworkId}`} className={`blog-story-artwork__folder blog-story-artwork__folder--middle`} />
      <div id={`blog-story-artwork-folder-main-${artworkId}`} className={`blog-story-artwork__folder blog-story-artwork__folder--main`}>
        <span id={`blog-story-artwork-symbol-${artworkId}`} className={`blog-story-artwork__symbol`}>
          <Icon size={72} strokeWidth={1.8} color={accent.color} name={getBlogStoryIcon(article.id)} id={`blog-story-artwork-icon-${artworkId}`} className={`blog-story-artwork__icon`} />
        </span>
        <span id={`blog-story-artwork-category-${artworkId}`} className={`blog-story-artwork__category`}>{article.category}</span>
      </div>
      <div id={`blog-story-artwork-brand-${artworkId}`} className={`blog-story-artwork__brand`}>
        <BrandMark size={38} id={`blog-story-artwork-brand-mark-${artworkId}`} className={`blog-story-artwork__brand-mark`} />
        <span id={`blog-story-artwork-brand-label-${artworkId}`} className={`blog-story-artwork__brand-label`}>{`Directory`}<br />{`Directory`}</span>
      </div>
    </div>
  );
};

export default BlogStoryArtwork;
