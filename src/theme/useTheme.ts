import { useContext } from 'react';
import { APP_MESSAGES } from '../constants/messages';
import { ThemeContext } from './themeContext';
import type { ThemeContextValue } from './themeTypes';

export function useTheme(): ThemeContextValue {
  const themeContext = useContext(ThemeContext);

  if (themeContext === null) {
    throw new Error(APP_MESSAGES.theme.contextMissing);
  }

  return themeContext;
}
