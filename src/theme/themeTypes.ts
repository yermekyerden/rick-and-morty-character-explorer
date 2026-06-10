export const APP_THEME = {
  dark: 'dark',
  light: 'light',
} as const;

export type AppTheme = (typeof APP_THEME)[keyof typeof APP_THEME];

export interface ThemeContextValue {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  toggleTheme: () => void;
}
