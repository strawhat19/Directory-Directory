import {
  useRef,
  useState,
  useEffect,
  useCallback,
  createContext,
  type PropsWithChildren,
} from 'react';
import { readTheme, writeTheme } from './themeStorage';
import type { Theme } from './theme.types';

type ThemeContextValue = {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
  const changed = useRef(false);
  const [theme, setCurrentTheme] = useState<Theme>(`light`);

  useEffect(() => {
    let active = true;

    readTheme()
      .then((stored) => {
        if (active && !changed.current) setCurrentTheme(stored);
      })
      .catch(() => {});

    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (typeof document === `undefined`) return;

    document.documentElement.dataset.theme = theme;

    let themeColor = document.querySelector<HTMLMetaElement>(`meta[name='theme-color']`);

    if (!themeColor) {
      themeColor = document.createElement(`meta`);
      themeColor.name = `theme-color`;
      document.head.appendChild(themeColor);
    }

    themeColor.content = theme === `dark` ? `#0b1220` : `#f7f8fa`;
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    changed.current = true;
    setCurrentTheme(next);
    writeTheme(next).catch(() => {});
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === `dark` ? `light` : `dark`);
  }, [setTheme, theme]);

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === `dark`, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
