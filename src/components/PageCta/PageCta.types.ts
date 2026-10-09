import type { Href } from 'expo-router';
import type { IconName } from '../Icon/Icon.types';
import type { SiteNavigationId } from '../../shared/navigation/siteNavigation';

export type PageCtaTone = `blue` | `green` | `purple` | `red`;
export type PageCtaPattern = `dots` | `rings` | `grid`;
export type PageCtaAction = { href: Href; label: string; icon: IconName };
export type PageCtaContent = {
  id: string;
  title: string;
  eyebrow: string;
  icon: IconName;
  tone: PageCtaTone;
  pattern: PageCtaPattern;
  description: string;
  primary: PageCtaAction;
  secondary?: PageCtaAction;
};
export type PageCtaProps = {
  banner?: boolean;
  compact?: boolean;
  fullBleed?: boolean;
  parentMaxWidth?: number;
  horizontalInset?: number;
  content: PageCtaContent;
  navigationPage?: SiteNavigationId;
};
