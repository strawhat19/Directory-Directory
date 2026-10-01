import type { IconName } from '../Icon/Icon.types';

type PricingPlan = {
  id: string;
  name: string;
  icon: IconName;
  color: string;
  price: string;
  period: string;
  detail: string;
  summary: string;
  audience: string;
  highlighted?: boolean;
  features: readonly string[];
};

export const pricingPlans: readonly PricingPlan[] = [
  {
    id: `free`,
    price: `$0`,
    name: `Free`,
    icon: `globe`,
    period: `forever`,
    color: `#637a98`,
    audience: `For Explorers`,
    detail: `No subscription required`,
    summary: `Good finds start with a little exploring.`,
    features: [
      `Browse every category`,
      `Search and filter directories`,
      `Bookmark your favorite finds`,
      `Explore without an account`,
    ],
  },
  {
    color: `#21a668`,
    id: `distributor`,
    name: `Distributor`,
    icon: `grid`,
    price: `$9`,
    period: `/ month`,
    detail: `Billed monthly in USD`,
    audience: `For Directory Owners`,
    summary: `Give your directory a place to call home.`,
    features: [
      `Everything in Free`,
      `Submit and claim your listing`,
      `Rich directory profiles`,
      `Images and social links`,
      `Basic listing analytics`,
    ],
  },
  {
    icon: `clapperboard`,
    id: `director`,
    color: `#0874f9`,
    name: `Director`,
    highlighted: true,
    price: `$29`,
    period: `/ month`,
    detail: `Billed monthly in USD`,
    audience: `For Growing Directories`,
    summary: `Stand out, reach more people, and keep growing.`,
    features: [
      `Everything in Distributor`,
      `Featured category placement`,
      `Advanced traffic analytics`,
      `Receive lead inquiries`,
      `Scheduled listing updates`,
    ],
  },
  {
    id: `dragon`,
    name: `Dragon`,
    icon: `dragon`,
    color: `#d83b42`,
    price: `$79`,
    period: `/ month`,
    detail: `Billed monthly in USD`,
    audience: `For Teams & Power Users`,
    summary: `A bigger toolkit for your next big chapter.`,
    features: [
      `Everything in Director`,
      `Manage multiple listings`,
      `Team member access`,
      `Bulk import and export`,
      `Developer API access`,
      `Priority support`,
    ],
  },
];
