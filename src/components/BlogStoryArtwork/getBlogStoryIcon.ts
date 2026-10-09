import type { IconName } from '../Icon/Icon.types';

const blogStoryIcons: Record<string, IconName> = {
  [`discover-niche-resources`]: `sparkles`,
  [`directory-vs-search-engine`]: `search`,
  [`directories-for-local-discovery`]: `places`,
  [`choose-a-trustworthy-directory`]: `shield`,
  [`why-a-directory-of-directories`]: `list`,
  [`organize-a-resource-collection`]: `bookmark`,
};

export const getBlogStoryIcon = (articleId: string): IconName => blogStoryIcons[articleId] ?? `learning`;
