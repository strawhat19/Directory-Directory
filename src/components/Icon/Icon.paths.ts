import type { IconName } from './Icon.types';

export const iconPaths: Record<IconName, readonly string[]> = {
  plus: [`M12 5v14M5 12h14`],
  close: [`m6 6 12 12M18 6 6 18`],
  check: [`m5 12 4 4L19 6`],
  menu: [`M4 6h16M4 12h16M4 18h16`],
  list: [`M9 6h11M9 12h11M9 18h11`, `M4 6h.01M4 12h.01M4 18h.01`],
  'arrow-right': [`M4 12h15m-6-6 6 6-6 6`],
  'arrow-up-right': [`M6 18 18 6M6 6h12v12`],
  search: [`M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z`, `m15 15 6 6`],
  bookmark: [`M6 4h12v17l-6-4-6 4V4Z`],
  design: [`m4 16 11-11 4 4L8 20l-5 1 1-5Z`, `m13 7 4 4M4 16l4 4`],
  places: [`M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z`, `M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z`],
  grid: [
    `M4 4h6v6H4V4ZM14 4h6v6h-6V4Z`,
    `M4 14h6v6H4v-6ZM14 14h6v6h-6v-6Z`,
  ],
  tools: [
    `M21 6a7 7 0 0 1-9 8l-7 7a2.8 2.8 0 0 1-4-4l7-7a7 7 0 0 1 8-9l-4 4 2 4 4 1 3-4Z`,
  ],
  globe: [
    `M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z`,
    `M2 12h20M12 2a19 19 0 0 1 0 20 19 19 0 0 1 0-20Z`,
  ],
  sparkles: [
    `m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z`,
    `M20 2v4M18 4h4`,
  ],
  communities: [
    `M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z`,
    `M6 21v-3a6 6 0 0 1 12 0v3H6Z`,
    `M18 6a3 3 0 0 1 0 6M6 6a3 3 0 0 0 0 6M20 15a4 4 0 0 1 2 4v2M4 15a4 4 0 0 0-2 4v2`,
  ],
};
