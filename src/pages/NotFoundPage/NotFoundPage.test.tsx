import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { APP_MESSAGES } from '../../constants/messages';
import { APP_ROUTES } from '../../router/routes';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  it('renders 404 message and link back to explorer', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText(APP_MESSAGES.notFoundPage.code)).toBeVisible();

    expect(
      screen.getByRole('heading', {
        name: APP_MESSAGES.notFoundPage.title,
      })
    ).toBeVisible();

    expect(
      screen.getByText(APP_MESSAGES.notFoundPage.description)
    ).toBeVisible();

    expect(
      screen.getByRole('link', {
        name: APP_MESSAGES.notFoundPage.backLink,
      })
    ).toHaveAttribute('href', APP_ROUTES.explorer);
  });
});
