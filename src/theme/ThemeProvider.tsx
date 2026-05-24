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

function getStoredTheme(): AppTheme | null {
  try {
    const storedTheme = localStorage.getItem(APP_THEME_STORAGE_KEY);

    return isAppTheme(storedTheme) ? storedTheme : null;
  } catch {
    return null;
  }
}

function getInitialTheme(): AppTheme {
  return getStoredTheme() ?? DEFAULT_THEME;
}

function getNextTheme(theme: AppTheme): AppTheme {
  return theme === APP_THEME.dark ? APP_THEME.light : APP_THEME.dark;
}

function storeTheme(theme: AppTheme): void {
  try {
    localStorage.setItem(APP_THEME_STORAGE_KEY, theme);
  } catch {
    return;
  }
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<AppTheme>(getInitialTheme);

  useEffect(() => {
    const rootElement = document.documentElement;

    rootElement.classList.add(THEME_TRANSITION_LOCK_CLASS_NAME);
    rootElement.dataset.theme = theme;

    storeTheme(theme);

    const unlockThemeTransitionTimeoutId = window.setTimeout(() => {
      rootElement.classList.remove(THEME_TRANSITION_LOCK_CLASS_NAME);
    }, THEME_TRANSITION_UNLOCK_DELAY_IN_MS);

    return () => {
      window.clearTimeout(unlockThemeTransitionTimeoutId);
      rootElement.classList.remove(THEME_TRANSITION_LOCK_CLASS_NAME);
    };
  }, [theme]);

  const setTheme = useCallback((nextTheme: AppTheme) => {
    setThemeState((currentTheme) => {
      if (currentTheme === nextTheme) {
        return currentTheme;
      }

      return nextTheme;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((currentTheme) => getNextTheme(currentTheme));
  }, []);

  const themeContextValue = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
