import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { APP_MESSAGES } from '../../constants/messages';
import ThemeProvider from '../../theme/ThemeProvider';
import { APP_THEME } from '../../theme/themeTypes';
import ThemeSwitcher from './ThemeSwitcher';

function renderThemeSwitcher() {
  render(
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>
  );
}

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders theme toggle button', async () => {
    renderThemeSwitcher();

    expect(
      screen.getByRole('button', {
        name: APP_MESSAGES.theme.switchToLightDimension,
      })
    ).toBeVisible();

    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute(
        'data-theme',
        APP_THEME.dark
      );
    });
  });

  it('toggles theme when user clicks the button', async () => {
    const user = userEvent.setup();

    renderThemeSwitcher();

    await user.click(
      screen.getByRole('button', {
        name: APP_MESSAGES.theme.switchToLightDimension,
      })
    );

    expect(
      screen.getByRole('button', {
        name: APP_MESSAGES.theme.switchToDarkDimension,
      })
    ).toBeVisible();

    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute(
        'data-theme',
        APP_THEME.light
      );
    });
  });
});
