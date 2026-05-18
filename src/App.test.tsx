import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import App from './App';
import { APP_MESSAGES } from './constants/messages';

vi.mock('./api/charactersApi', () => ({
  fetchCharacterCards: vi.fn(() => Promise.resolve([])),
}));

vi.mock('./utils/delay', () => ({
  delay: vi.fn(() => Promise.resolve()),
}));

function renderAppAtRoute(route: string) {
  render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );
}

describe('App', () => {
  it('renders explorer route by default', () => {
    renderAppAtRoute('/');

    expect(
      screen.getByRole('heading', {
        name: APP_MESSAGES.app.title,
      })
    ).toBeVisible();
  });

  it('renders about route', () => {
    renderAppAtRoute('/about');

    expect(
      screen.getByRole('heading', {
        name: /about character explorer/i,
      })
    ).toBeVisible();
  });

  it('renders not found route for unknown paths', () => {
    renderAppAtRoute('/unknown-dimension');

    expect(
      screen.getByRole('heading', {
        name: /dimension not found/i,
      })
    ).toBeVisible();
  });
});
