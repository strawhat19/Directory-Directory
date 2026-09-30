import { parseTheme, themeStorageKey, type Theme } from './theme.types';

export const readTheme = async () => parseTheme(window.localStorage.getItem(themeStorageKey));

export const writeTheme = async (theme: Theme) => {
  window.localStorage.setItem(themeStorageKey, theme);
};
