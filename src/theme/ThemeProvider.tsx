import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { APP_THEME_STORAGE_KEY } from '../constants/storageKeys';
import { ThemeContext } from './themeContext';
import { APP_THEME } from './themeTypes';
import type { AppTheme } from './themeTypes';

interface ThemeProviderProps {
  children: ReactNode;
}

const DEFAULT_THEME: AppTheme = APP_THEME.dark;

function isAppTheme(value: string | null): value is AppTheme {
  return value === APP_THEME.dark || value === APP_THEME.light;
}

function getInitialTheme(): AppTheme {
  try {
    const storedTheme = localStorage.getItem(APP_THEME_STORAGE_KEY);

    if (isAppTheme(storedTheme)) {
      return storedTheme;
    }
  } catch {
    return DEFAULT_THEME;
  }

  return DEFAULT_THEME;
}

function saveTheme(theme: AppTheme): void {
  try {
    localStorage.setItem(APP_THEME_STORAGE_KEY, theme);
  } catch {
    return;
  }
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<AppTheme>(getInitialTheme);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) =>
      currentTheme === APP_THEME.dark ? APP_THEME.light : APP_THEME.dark
    );
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    saveTheme(theme);
  }, [theme]);

  const themeContextValue = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
