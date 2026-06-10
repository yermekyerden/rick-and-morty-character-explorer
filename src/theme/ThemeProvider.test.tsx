import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { APP_THEME_STORAGE_KEY } from '../constants/storageKeys';
import ThemeProvider from './ThemeProvider';
import { APP_THEME } from './themeTypes';
import { useTheme } from './useTheme';

const TOGGLE_THEME_BUTTON_NAME = 'Toggle theme';
const SET_LIGHT_THEME_BUTTON_NAME = 'Set light theme';

function ThemeProbe() {
  const { setTheme, theme, toggleTheme } = useTheme();

  return (
    <div>
      <p>{theme}</p>

      <button type="button" onClick={toggleTheme}>
        {TOGGLE_THEME_BUTTON_NAME}
      </button>

      <button type="button" onClick={() => setTheme(APP_THEME.light)}>
        {SET_LIGHT_THEME_BUTTON_NAME}
      </button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('provides dark theme by default', async () => {
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );

    expect(screen.getByText(APP_THEME.dark)).toBeVisible();

    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute(
        'data-theme',
        APP_THEME.dark
      );
    });

    expect(localStorage.getItem(APP_THEME_STORAGE_KEY)).toBe(APP_THEME.dark);
  });

  it('uses stored theme as initial theme', async () => {
    localStorage.setItem(APP_THEME_STORAGE_KEY, APP_THEME.light);

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );

    expect(screen.getByText(APP_THEME.light)).toBeVisible();

    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute(
        'data-theme',
        APP_THEME.light
      );
    });
  });

  it('ignores invalid stored theme', async () => {
    localStorage.setItem(APP_THEME_STORAGE_KEY, 'invalid-theme');

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );

    expect(screen.getByText(APP_THEME.dark)).toBeVisible();

    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute(
        'data-theme',
        APP_THEME.dark
      );
    });

    expect(localStorage.getItem(APP_THEME_STORAGE_KEY)).toBe(APP_THEME.dark);
  });

  it('toggles theme and stores selected value', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );

    await user.click(
      screen.getByRole('button', {
        name: TOGGLE_THEME_BUTTON_NAME,
      })
    );

    expect(screen.getByText(APP_THEME.light)).toBeVisible();

    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute(
        'data-theme',
        APP_THEME.light
      );
    });

    expect(localStorage.getItem(APP_THEME_STORAGE_KEY)).toBe(APP_THEME.light);
  });

  it('sets selected theme and stores selected value', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );

    await user.click(
      screen.getByRole('button', {
        name: SET_LIGHT_THEME_BUTTON_NAME,
      })
    );

    expect(screen.getByText(APP_THEME.light)).toBeVisible();

    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute(
        'data-theme',
        APP_THEME.light
      );
    });

    expect(localStorage.getItem(APP_THEME_STORAGE_KEY)).toBe(APP_THEME.light);
  });
});
