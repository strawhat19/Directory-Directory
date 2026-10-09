import { featuredArticle } from '../../shared/blog/articles';

export const directoryIntroCta = {
  label: `Read More`,
  id: `directory-intro-cta`,
  title: `Organizing is in our DNA.`,
  eyebrow: `A Little Order. A Lot to Discover.`,
  href: `/blog/${featuredArticle.slug}` as const,
  description: `A directory brings related resources together in one place. Directory Directory organizes those directories by category, so your next great find is easier to discover.`,
};
