import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchCharacterCards } from './api/charactersApi';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { APP_MESSAGES } from './constants/messages';
import { LAST_SEARCH_TERM_STORAGE_KEY } from './constants/storageKeys';
import {
  testCharacterCard,
  testMortyCharacterCard,
} from './test/testCharacters';
import { delay } from './utils/delay';

vi.mock('./api/charactersApi', () => ({
  fetchCharacterCards: vi.fn(),
}));

vi.mock('./utils/delay', () => ({
  delay: vi.fn(),
}));

const fetchCharacterCardsMock = vi.mocked(fetchCharacterCards);
const delayMock = vi.mocked(delay);

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();

    fetchCharacterCardsMock.mockReset();
    delayMock.mockReset();

    fetchCharacterCardsMock.mockResolvedValue([testCharacterCard]);
    delayMock.mockResolvedValue(undefined);
  });

  it('renders application intro and search form', () => {
    const expectedTitle = APP_MESSAGES.app.title;
    const expectedDescription = APP_MESSAGES.app.description;
    const expectedSearchLabel = APP_MESSAGES.search.label;

    render(<App />);

    expect(screen.getByRole('heading', { name: expectedTitle })).toBeVisible();
    expect(screen.getByText(expectedDescription)).toBeVisible();
    expect(screen.getByLabelText(expectedSearchLabel)).toBeVisible();
  });

  it('loads first page of characters on initial render', async () => {
    const expectedSearchTerm = '';
    const expectedCharacterName = testCharacterCard.name;

    render(<App />);

    expect(
      await screen.findByRole('heading', { name: expectedCharacterName })
    ).toBeVisible();
    expect(fetchCharacterCardsMock).toHaveBeenCalledWith(expectedSearchTerm);
  });

  it('uses saved localStorage search term for initial load', async () => {
    const savedSearchTerm = 'Rick';
    const expectedCharacterName = testCharacterCard.name;

    localStorage.setItem(LAST_SEARCH_TERM_STORAGE_KEY, savedSearchTerm);

    render(<App />);

    expect(screen.getByLabelText(APP_MESSAGES.search.label)).toHaveValue(
      savedSearchTerm
    );
    expect(
      await screen.findByRole('heading', { name: expectedCharacterName })
    ).toBeVisible();
    expect(fetchCharacterCardsMock).toHaveBeenCalledWith(savedSearchTerm);
  });

  it('shows loading state while characters are loading', () => {
    fetchCharacterCardsMock.mockReturnValue(new Promise(() => {}));

    render(<App />);

    expect(screen.getByText(APP_MESSAGES.loader.message)).toBeVisible();
  });

  it('loads matching characters when user submits search', async () => {
    const user = userEvent.setup();
    const searchTerm = 'Morty';
    const expectedCharacterName = testMortyCharacterCard.name;

    render(<App />);

    await screen.findByRole('heading', {
      name: testCharacterCard.name,
    });

    fetchCharacterCardsMock.mockResolvedValueOnce([testMortyCharacterCard]);

    await user.type(
      screen.getByLabelText(APP_MESSAGES.search.label),
      searchTerm
    );
    await user.click(
      screen.getByRole('button', {
        name: APP_MESSAGES.search.button,
      })
    );

    expect(
      await screen.findByRole('heading', { name: expectedCharacterName })
    ).toBeVisible();
    expect(fetchCharacterCardsMock).toHaveBeenLastCalledWith(searchTerm);
  });

  it('shows API error message when character loading fails', async () => {
    const expectedErrorMessage = APP_MESSAGES.apiErrors.notFound;

    fetchCharacterCardsMock.mockRejectedValue(new Error(expectedErrorMessage));

    render(<App />);

    expect(await screen.findByText(expectedErrorMessage)).toBeVisible();
    expect(
      screen.getByRole('heading', {
        name: APP_MESSAGES.noResults.title,
      })
    ).toBeVisible();
  });

  it('shows unknown API error message when rejected value is not an Error', async () => {
    const expectedErrorMessage = APP_MESSAGES.apiErrors.unknown;

    fetchCharacterCardsMock.mockRejectedValue('Unexpected API failure');

    render(<App />);

    expect(await screen.findByText(expectedErrorMessage)).toBeVisible();
    expect(
      screen.getByRole('heading', {
        name: APP_MESSAGES.noResults.title,
      })
    ).toBeVisible();
  });

  it('stores submitted search term in localStorage', async () => {
    const user = userEvent.setup();
    const searchTerm = 'Summer';

    render(<App />);

    await screen.findByRole('heading', {
      name: testCharacterCard.name,
    });

    fetchCharacterCardsMock.mockResolvedValueOnce([testCharacterCard]);

    await user.type(
      screen.getByLabelText(APP_MESSAGES.search.label),
      searchTerm
    );
    await user.click(
      screen.getByRole('button', {
        name: APP_MESSAGES.search.button,
      })
    );

    await waitFor(() => {
      expect(localStorage.getItem(LAST_SEARCH_TERM_STORAGE_KEY)).toBe(
        searchTerm
      );
    });
  });

  it('shows error boundary fallback when simulated error is triggered', async () => {
    const user = userEvent.setup();
    const expectedFallbackTitle = APP_MESSAGES.errorBoundary.title;

    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );

    await screen.findByRole('heading', {
      name: testCharacterCard.name,
    });

    await user.click(
      screen.getByRole('button', {
        name: APP_MESSAGES.errorTest.button,
      })
    );

    expect(
      screen.getByRole('heading', {
        name: expectedFallbackTitle,
      })
    ).toBeVisible();

    consoleError.mockRestore();
  });
});
