import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { APP_ROUTES } from '../../router/routes';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  it('renders 404 message and link back to explorer', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeVisible();

    expect(
      screen.getByRole('heading', {
        name: /dimension not found/i,
      })
    ).toBeVisible();

    expect(
      screen.getByText(/the portal opened in the wrong timeline/i)
    ).toBeVisible();

    expect(
      screen.getByRole('link', {
        name: /back to explorer/i,
      })
    ).toHaveAttribute('href', APP_ROUTES.explorer);
  });
});
