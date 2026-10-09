import type { ReactNode } from 'react';

export type BlogLayoutProps = {
  hero: ReactNode;
  scope: string;
  sticky?: boolean;
  article?: boolean;
  children: ReactNode;
};
