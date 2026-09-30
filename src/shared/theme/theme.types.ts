export type Theme = `light` | `dark`;

export const themeStorageKey = `directory-directory-theme`;

export const parseTheme = (value: string | null): Theme => value === `dark` ? `dark` : `light`;
