import type { IconName } from '../Icon/Icon.types';

type PricingGuideItem = {
  id: string;
  color: string;
  icon: IconName;
  title: string;
  description: string;
};

const items: readonly PricingGuideItem[] = [
  {
    id: `explore`,
    icon: `globe`,
    color: `#0874f9`,
    title: `Just here to explore?`,
    description: `Browse categories, search and filter sample directories, and keep bookmarks during your visit. No account or subscription is required.`,
  },
  {
    id: `directory`,
    icon: `folder`,
    color: `#21a668`,
    title: `Have a directory to share?`,
    description: `Distributor is planned for directory listings, while Director adds more visibility and growth tools. Both plans and their features are coming soon.`,
  },
  {
    id: `team`,
    color: `#8054d7`,
    icon: `communities`,
    title: `Building with a team?`,
    description: `Dragon is planned for teams managing multiple listings, with bulk tools and API access. The plan and these features are coming soon.`,
  },
];

export const pricingGuideContent = {
  items,
  eyebrow: `Choose Your Direction`,
  title: `Find your starting point`,
  summary: `Start with the free preview. The upcoming paid plans are designed for directory owners, growing projects, and teams.`,
};
