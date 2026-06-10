import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchCharacterDetails } from '../../api/charactersApi';
import { APP_MESSAGES } from '../../constants/messages';
import { testCharacterDetails } from '../../test/testCharacters';
import { delay } from '../../utils/delay';
import CharacterDetailsPanel from './CharacterDetailsPanel';

vi.mock('../../api/charactersApi', () => ({
  fetchCharacterDetails: vi.fn(),
}));

vi.mock('../../utils/delay', () => ({
  delay: vi.fn(),
}));

const fetchCharacterDetailsMock = vi.mocked(fetchCharacterDetails);
const delayMock = vi.mocked(delay);

function LocationProbe() {
  const location = useLocation();

  return (
    <output aria-label="current route">
      {location.pathname}
      {location.search}
    </output>
  );
}

function renderCharacterDetailsPanel(initialRoute = '/?page=1&details=1') {
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <CharacterDetailsPanel />
      <LocationProbe />
    </MemoryRouter>
  );
}

describe('CharacterDetailsPanel', () => {
  beforeEach(() => {
    fetchCharacterDetailsMock.mockReset();
    delayMock.mockReset();

    fetchCharacterDetailsMock.mockResolvedValue(testCharacterDetails);
    delayMock.mockResolvedValue(undefined);
  });

  it('renders nothing when no character is selected', () => {
    renderCharacterDetailsPanel('/?page=1');

    expect(
      screen.queryByLabelText('Character details')
    ).not.toBeInTheDocument();
  });

  it('loads and renders selected character details', async () => {
    renderCharacterDetailsPanel();

    expect(
      await screen.findByRole('heading', {
        name: testCharacterDetails.name,
      })
    ).toBeVisible();

    expect(fetchCharacterDetailsMock).toHaveBeenCalledWith(
      testCharacterDetails.id
    );
    expect(screen.getByText(testCharacterDetails.originName)).toBeVisible();
    expect(screen.getByText(testCharacterDetails.locationName)).toBeVisible();
    expect(
      screen.getByText(String(testCharacterDetails.episodeCount))
    ).toBeVisible();
  });

  it('shows loading state while details are loading', () => {
    fetchCharacterDetailsMock.mockReturnValue(new Promise(() => {}));

    renderCharacterDetailsPanel();

    expect(
      screen.getByText(APP_MESSAGES.characterDetails.loading)
    ).toBeVisible();
  });

  it('shows error state when details loading fails', async () => {
    const expectedErrorMessage = APP_MESSAGES.apiErrors.generic;

    fetchCharacterDetailsMock.mockRejectedValue(
      new Error(expectedErrorMessage)
    );

    renderCharacterDetailsPanel();

    expect(await screen.findByText(expectedErrorMessage)).toBeVisible();
    expect(
      screen.getByRole('heading', {
        name: APP_MESSAGES.characterDetails.errorTitle,
      })
    ).toBeVisible();
  });

  it('removes details parameter when close button is clicked', async () => {
    const user = userEvent.setup();

    renderCharacterDetailsPanel('/?page=2&search=Rick&details=1');

    await screen.findByRole('heading', {
      name: testCharacterDetails.name,
    });

    await user.click(
      screen.getByRole('button', {
        name: APP_MESSAGES.characterDetails.closeLabel,
      })
    );

    await waitFor(() => {
      expect(screen.getByLabelText('current route')).toHaveTextContent(
        '/?page=2&search=Rick'
      );
    });
  });
});
