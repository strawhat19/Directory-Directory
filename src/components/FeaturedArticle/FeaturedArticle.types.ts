import type { BlogArticle } from '../../shared/blog/articles';

export type FeaturedArticleProps = {
  scope: string;
  fullBleed?: boolean;
  article?: BlogArticle;
  accentColor?: string;
  showBlogLink?: boolean;
  horizontalInset?: number;
  backgroundColor?: string;
};
