import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchCharacterPage } from '../../api/charactersApi';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import { APP_MESSAGES } from '../../constants/messages';
import { LAST_SEARCH_TERM_STORAGE_KEY } from '../../constants/storageKeys';
import {
  testCharacterCard,
  testMortyCharacterCard,
} from '../../test/testCharacters';
import { delay } from '../../utils/delay';
import ExplorerPage from './ExplorerPage';
import QueryProvider from '../../query/QueryProvider';
import { createAppQueryClient } from '../../query/queryClient';

vi.mock('../../api/charactersApi', () => ({
  fetchCharacterPage: vi.fn(),
}));

vi.mock('../../utils/delay', () => ({
  delay: vi.fn(),
}));

const fetchCharacterPageMock = vi.mocked(fetchCharacterPage);
const delayMock = vi.mocked(delay);

function createCharacterPage(
  characters = [testCharacterCard],
  currentPage = 1,
  totalPages = 5
) {
  return {
    characters,
    currentPage,
    totalCount: characters.length,
    totalPages,
  };
}

function LocationProbe() {
  const location = useLocation();

  return (
    <output aria-label="current route">
      {location.pathname}
      {location.search}
    </output>
  );
}

function renderExplorerPage(initialRoute = '/') {
  const queryClient = createAppQueryClient();

  render(
    <QueryProvider queryClient={queryClient}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <ExplorerPage />
        <LocationProbe />
      </MemoryRouter>
    </QueryProvider>
  );
}

function renderExplorerPageWithBoundary(initialRoute = '/') {
  const queryClient = createAppQueryClient();

  render(
    <QueryProvider queryClient={queryClient}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <ErrorBoundary>
          <ExplorerPage />
        </ErrorBoundary>
      </MemoryRouter>
    </QueryProvider>
  );
}

describe('ExplorerPage', () => {
  beforeEach(() => {
    localStorage.clear();

    fetchCharacterPageMock.mockReset();
    delayMock.mockReset();

    fetchCharacterPageMock.mockResolvedValue(createCharacterPage());
    delayMock.mockResolvedValue(undefined);
  });

  it('renders application intro and search form', () => {
    const expectedTitle = APP_MESSAGES.app.title;
    const expectedDescription = APP_MESSAGES.app.description;
    const expectedSearchLabel = APP_MESSAGES.search.label;

    renderExplorerPage();

    expect(screen.getByRole('heading', { name: expectedTitle })).toBeVisible();
    expect(screen.getByText(expectedDescription)).toBeVisible();
    expect(screen.getByLabelText(expectedSearchLabel)).toBeVisible();
  });

  it('loads first page of characters on initial render', async () => {
    const expectedSearchTerm = '';
    const expectedCharacterName = testCharacterCard.name;

    renderExplorerPage();

    expect(
      await screen.findByRole('heading', { name: expectedCharacterName })
    ).toBeVisible();

    expect(fetchCharacterPageMock).toHaveBeenCalledWith({
      searchTerm: expectedSearchTerm,
      page: 1,
    });
  });

  it('uses saved localStorage search term for initial load', async () => {
    const savedSearchTerm = 'Rick';
    const expectedCharacterName = testCharacterCard.name;

    localStorage.setItem(LAST_SEARCH_TERM_STORAGE_KEY, savedSearchTerm);

    renderExplorerPage();

    expect(screen.getByLabelText(APP_MESSAGES.search.label)).toHaveValue(
      savedSearchTerm
    );

    expect(
      await screen.findByRole('heading', { name: expectedCharacterName })
    ).toBeVisible();

    expect(fetchCharacterPageMock).toHaveBeenCalledWith({
      searchTerm: savedSearchTerm,
      page: 1,
    });
  });

  it('uses URL search term before localStorage search term', async () => {
    const urlSearchTerm = 'Morty';

    localStorage.setItem(LAST_SEARCH_TERM_STORAGE_KEY, 'Rick');

    renderExplorerPage('/?page=2&search=Morty');

    expect(screen.getByLabelText(APP_MESSAGES.search.label)).toHaveValue(
      urlSearchTerm
    );

    await screen.findByRole('heading', {
      name: testCharacterCard.name,
    });

    expect(fetchCharacterPageMock).toHaveBeenCalledWith({
      searchTerm: urlSearchTerm,
      page: 2,
    });
  });

  it('shows loading state while characters are loading', () => {
    fetchCharacterPageMock.mockReturnValue(new Promise(() => {}));

    renderExplorerPage();

    expect(screen.getByText(APP_MESSAGES.loader.message)).toBeVisible();
  });

  it('loads matching characters when user submits search', async () => {
    const user = userEvent.setup();
    const searchTerm = 'Morty';
    const expectedCharacterName = testMortyCharacterCard.name;

    renderExplorerPage();

    await screen.findByRole('heading', {
      name: testCharacterCard.name,
    });

    fetchCharacterPageMock.mockResolvedValueOnce(
      createCharacterPage([testMortyCharacterCard])
    );

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

    expect(fetchCharacterPageMock).toHaveBeenLastCalledWith({
      searchTerm,
      page: 1,
    });
  });

  it('loads next page when user clicks pagination next button', async () => {
    const user = userEvent.setup();

    renderExplorerPage();

    await screen.findByRole('heading', {
      name: testCharacterCard.name,
    });

    fetchCharacterPageMock.mockResolvedValueOnce(
      createCharacterPage([testMortyCharacterCard], 2, 5)
    );

    await user.click(
      screen.getByRole('button', {
        name: APP_MESSAGES.pagination.next,
      })
    );

    expect(
      await screen.findByRole('heading', {
        name: testMortyCharacterCard.name,
      })
    ).toBeVisible();

    expect(fetchCharacterPageMock).toHaveBeenLastCalledWith({
      searchTerm: '',
      page: 2,
    });

    expect(
      screen.getByText(APP_MESSAGES.pagination.pageSummary(2, 5))
    ).toBeVisible();
  });

  it('shows API error message when character loading fails', async () => {
    const expectedErrorMessage = APP_MESSAGES.apiErrors.notFound;

    fetchCharacterPageMock.mockRejectedValue(new Error(expectedErrorMessage));

    renderExplorerPage();

    expect(await screen.findByText(expectedErrorMessage)).toBeVisible();

    expect(
      screen.getByRole('heading', {
        name: APP_MESSAGES.noResults.title,
      })
    ).toBeVisible();
  });

  it('shows unknown API error message when rejected value is not an Error', async () => {
    const expectedErrorMessage = APP_MESSAGES.apiErrors.unknown;

    fetchCharacterPageMock.mockRejectedValue('Unexpected API failure');

    renderExplorerPage();

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

    renderExplorerPage();

    await screen.findByRole('heading', {
      name: testCharacterCard.name,
    });

    fetchCharacterPageMock.mockResolvedValueOnce(createCharacterPage());

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

    renderExplorerPageWithBoundary();

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

  it('adds selected character id to URL when user opens character dossier', async () => {
    const user = userEvent.setup();

    renderExplorerPage();

    await screen.findByRole('heading', {
      name: testCharacterCard.name,
    });

    await user.click(
      screen.getByRole('button', {
        name: APP_MESSAGES.characterCard.openDetailsLabel(
          testCharacterCard.name
        ),
      })
    );

    await waitFor(() => {
      expect(screen.getByLabelText('current route')).toHaveTextContent(
        '/?page=1&details=1'
      );
    });
  });
});
