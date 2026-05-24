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
const THEME_TRANSITION_LOCK_CLASS_NAME = 'theme-transition-lock';
const THEME_TRANSITION_UNLOCK_DELAY_IN_MS = 0;

function isAppTheme(value: string | null): value is AppTheme {
  return value === APP_THEME.dark || value === APP_THEME.light;
}

function getInitialTheme(): AppTheme {
  const storedTheme = localStorage.getItem(APP_THEME_STORAGE_KEY);

  if (isAppTheme(storedTheme)) {
    return storedTheme;
  }

  return DEFAULT_THEME;
}

function applyTheme(theme: AppTheme): void {
  document.documentElement.dataset.theme = theme;
}

function lockThemeTransitionsTemporarily(): void {
  document.documentElement.classList.add(THEME_TRANSITION_LOCK_CLASS_NAME);

  window.setTimeout(() => {
    document.documentElement.classList.remove(THEME_TRANSITION_LOCK_CLASS_NAME);
  }, THEME_TRANSITION_UNLOCK_DELAY_IN_MS);
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<AppTheme>(getInitialTheme);

  const setTheme = useCallback(
    (nextTheme: AppTheme) => {
      if (nextTheme === theme) {
        return;
      }

      lockThemeTransitionsTemporarily();
      applyTheme(nextTheme);
      setThemeState(nextTheme);
    },
    [theme]
  );

  const toggleTheme = useCallback(() => {
    const nextTheme =
      theme === APP_THEME.dark ? APP_THEME.light : APP_THEME.dark;

    setTheme(nextTheme);
  }, [setTheme, theme]);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(APP_THEME_STORAGE_KEY, theme);
  }, [theme]);

  const themeContextValue = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [setTheme, theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
