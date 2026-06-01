import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { fetchCharacterDetails, fetchCharacterPage } from './api/charactersApi';
import { APP_MESSAGES } from './constants/messages';
import { testCharacterCard, testCharacterDetails } from './test/testCharacters';
import type { CharacterCardModel } from './types/character';
import { delay } from './utils/delay';
import ThemeProvider from './theme/ThemeProvider';
import QueryProvider from './query/QueryProvider';
import { createAppQueryClient } from './query/queryClient';

vi.mock('./api/charactersApi', () => ({
  fetchCharacterDetails: vi.fn(),
  fetchCharacterPage: vi.fn(),
}));

vi.mock('./utils/delay', () => ({
  delay: vi.fn(),
}));

const fetchCharacterPageMock = vi.mocked(fetchCharacterPage);
const fetchCharacterDetailsMock = vi.mocked(fetchCharacterDetails);
const delayMock = vi.mocked(delay);

function createCharacterPage(
  characters: CharacterCardModel[] = [testCharacterCard],
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

function renderApp(initialRoute = '/') {
  const queryClient = createAppQueryClient();

  render(
    <ThemeProvider>
      <QueryProvider queryClient={queryClient}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <App />
          <LocationProbe />
        </MemoryRouter>
      </QueryProvider>
    </ThemeProvider>
  );
}

describe('App master-detail routing', () => {
  beforeEach(() => {
    localStorage.clear();

    fetchCharacterPageMock.mockReset();
    fetchCharacterDetailsMock.mockReset();
    delayMock.mockReset();

    fetchCharacterPageMock.mockResolvedValue(createCharacterPage());
    fetchCharacterDetailsMock.mockResolvedValue(testCharacterDetails);
    delayMock.mockResolvedValue(undefined);
  });

  it('opens character details from URL details parameter', async () => {
    renderApp('/?page=2&details=1');

    const detailsPanel = await screen.findByLabelText('Character details');

    expect(
      await within(detailsPanel).findByRole('heading', {
        name: testCharacterDetails.name,
      })
    ).toBeVisible();

    expect(
      within(detailsPanel).getByText(testCharacterDetails.originName)
    ).toBeVisible();

    expect(fetchCharacterPageMock).toHaveBeenCalledWith({
      searchTerm: '',
      page: 2,
    });

    expect(fetchCharacterDetailsMock).toHaveBeenCalledWith(
      testCharacterDetails.id
    );

    expect(screen.getByLabelText('current route')).toHaveTextContent(
      '/?page=2&details=1'
    );
  });

  it('opens details through Outlet and closes the details panel', async () => {
    const user = userEvent.setup();

    renderApp('/?page=1');

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

    const detailsPanel = await screen.findByLabelText('Character details');

    expect(
      await within(detailsPanel).findByRole('heading', {
        name: testCharacterDetails.name,
      })
    ).toBeVisible();

    expect(screen.getByLabelText('current route')).toHaveTextContent(
      '/?page=1&details=1'
    );

    await user.click(
      within(detailsPanel).getByRole('button', {
        name: APP_MESSAGES.characterDetails.closeLabel,
      })
    );

    await waitFor(() => {
      expect(
        screen.queryByLabelText('Character details')
      ).not.toBeInTheDocument();
    });

    expect(screen.getByLabelText('current route')).toHaveTextContent(
      '/?page=1'
    );
  });

  it('closes selected details when user submits a new search', async () => {
    const user = userEvent.setup();
    const nextSearchTerm = 'Morty';

    renderApp('/?page=2&search=Rick&details=1');

    const detailsPanel = await screen.findByLabelText('Character details');

    expect(
      await within(detailsPanel).findByRole('heading', {
        name: testCharacterDetails.name,
      })
    ).toBeVisible();

    fetchCharacterPageMock.mockResolvedValueOnce(createCharacterPage());

    await user.clear(screen.getByLabelText(APP_MESSAGES.search.label));
    await user.type(
      screen.getByLabelText(APP_MESSAGES.search.label),
      nextSearchTerm
    );
    await user.click(
      screen.getByRole('button', {
        name: APP_MESSAGES.search.button,
      })
    );

    await waitFor(() => {
      expect(screen.getByLabelText('current route')).toHaveTextContent(
        '/?page=1&search=Morty'
      );
    });

    expect(
      screen.queryByLabelText('Character details')
    ).not.toBeInTheDocument();
  });

  it('reuses cached character details when the same dossier is reopened', async () => {
    const user = userEvent.setup();

    renderApp('/?page=1');

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

    const firstDetailsPanel = await screen.findByLabelText('Character details');

    expect(
      await within(firstDetailsPanel).findByRole('heading', {
        name: testCharacterDetails.name,
      })
    ).toBeVisible();

    expect(fetchCharacterDetailsMock).toHaveBeenCalledTimes(1);

    await user.click(
      within(firstDetailsPanel).getByRole('button', {
        name: APP_MESSAGES.characterDetails.closeLabel,
      })
    );

    await waitFor(() => {
      expect(
        screen.queryByLabelText('Character details')
      ).not.toBeInTheDocument();
    });

    await user.click(
      screen.getByRole('button', {
        name: APP_MESSAGES.characterCard.openDetailsLabel(
          testCharacterCard.name
        ),
      })
    );

    const secondDetailsPanel =
      await screen.findByLabelText('Character details');

    expect(
      await within(secondDetailsPanel).findByRole('heading', {
        name: testCharacterDetails.name,
      })
    ).toBeVisible();

    expect(fetchCharacterDetailsMock).toHaveBeenCalledTimes(1);
  });

  it('refreshes selected character details when refresh data is clicked', async () => {
    const user = userEvent.setup();
    const refreshedCharacterDetails = {
      ...testCharacterDetails,
      name: 'Refreshed Rick Sanchez',
      locationName: 'Refreshed Dimension',
    };

    renderApp('/?page=1&details=1');

    const detailsPanel = await screen.findByLabelText('Character details');

    expect(
      await within(detailsPanel).findByRole('heading', {
        name: testCharacterDetails.name,
      })
    ).toBeVisible();

    expect(fetchCharacterDetailsMock).toHaveBeenCalledTimes(1);

    fetchCharacterPageMock.mockResolvedValueOnce(createCharacterPage());
    fetchCharacterDetailsMock.mockResolvedValueOnce(refreshedCharacterDetails);

    await user.click(
      screen.getByRole('button', {
        name: APP_MESSAGES.results.refreshData,
      })
    );

    expect(
      await within(detailsPanel).findByRole('heading', {
        name: refreshedCharacterDetails.name,
      })
    ).toBeVisible();

    expect(fetchCharacterDetailsMock).toHaveBeenCalledTimes(2);
  });
});
