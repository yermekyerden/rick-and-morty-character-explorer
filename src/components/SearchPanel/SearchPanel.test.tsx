import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { APP_MESSAGES } from '../../constants/messages';
import { LAST_SEARCH_TERM_STORAGE_KEY } from '../../constants/storageKeys';
import SearchPanel from './SearchPanel';

function renderSearchPanel() {
  const onInitialSearchTermLoaded = vi.fn();
  const onSearch = vi.fn();

  render(
    <SearchPanel
      onInitialSearchTermLoaded={onInitialSearchTermLoaded}
      onSearch={onSearch}
    />
  );

  return {
    onInitialSearchTermLoaded,
    onSearch,
    searchButton: screen.getByRole('button', {
      name: APP_MESSAGES.search.button,
    }),
    searchInput: screen.getByLabelText(APP_MESSAGES.search.label),
  };
}

describe('SearchPanel', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders empty input when localStorage has no saved search term', () => {
    const expectedSearchTerm = '';

    const { onInitialSearchTermLoaded, searchInput } = renderSearchPanel();

    expect(searchInput).toHaveValue(expectedSearchTerm);
    expect(onInitialSearchTermLoaded).toHaveBeenCalledWith(expectedSearchTerm);
  });

  it('renders saved search term from localStorage on mount', () => {
    const savedSearchTerm = 'Rick';

    localStorage.setItem(LAST_SEARCH_TERM_STORAGE_KEY, savedSearchTerm);

    const { onInitialSearchTermLoaded, searchInput } = renderSearchPanel();

    expect(searchInput).toHaveValue(savedSearchTerm);
    expect(onInitialSearchTermLoaded).toHaveBeenCalledWith(savedSearchTerm);
  });

  it('trims saved search term from localStorage on mount', () => {
    const savedSearchTerm = 'Morty';

    localStorage.setItem(LAST_SEARCH_TERM_STORAGE_KEY, '  Morty  ');

    const { onInitialSearchTermLoaded, searchInput } = renderSearchPanel();

    expect(searchInput).toHaveValue(savedSearchTerm);
    expect(onInitialSearchTermLoaded).toHaveBeenCalledWith(savedSearchTerm);
  });

  it('updates input value when user types', async () => {
    const user = userEvent.setup();
    const expectedSearchTerm = 'Summer';

    const { searchInput } = renderSearchPanel();

    await user.type(searchInput, expectedSearchTerm);

    expect(searchInput).toHaveValue(expectedSearchTerm);
  });

  it('saves trimmed search term and calls onSearch on submit', async () => {
    const user = userEvent.setup();
    const expectedSearchTerm = 'Beth';

    const { onSearch, searchButton, searchInput } = renderSearchPanel();

    await user.type(searchInput, '  Beth  ');
    await user.click(searchButton);

    expect(searchInput).toHaveValue(expectedSearchTerm);
    expect(localStorage.getItem(LAST_SEARCH_TERM_STORAGE_KEY)).toBe(
      expectedSearchTerm
    );
    expect(onSearch).toHaveBeenCalledWith(expectedSearchTerm);
  });

  it('overwrites existing localStorage value when a new search is submitted', async () => {
    const user = userEvent.setup();
    const expectedSearchTerm = 'Jerry';

    localStorage.setItem(LAST_SEARCH_TERM_STORAGE_KEY, 'Rick');

    const { onSearch, searchButton, searchInput } = renderSearchPanel();

    await user.clear(searchInput);
    await user.type(searchInput, expectedSearchTerm);
    await user.click(searchButton);

    expect(localStorage.getItem(LAST_SEARCH_TERM_STORAGE_KEY)).toBe(
      expectedSearchTerm
    );
    expect(onSearch).toHaveBeenCalledWith(expectedSearchTerm);
  });

  it('does not call onSearch when submitted search term has not changed', async () => {
    const user = userEvent.setup();
    const savedSearchTerm = 'Rick';

    localStorage.setItem(LAST_SEARCH_TERM_STORAGE_KEY, savedSearchTerm);

    const { onSearch, searchButton } = renderSearchPanel();

    await user.click(searchButton);

    expect(onSearch).not.toHaveBeenCalled();
    expect(localStorage.getItem(LAST_SEARCH_TERM_STORAGE_KEY)).toBe(
      savedSearchTerm
    );
  });

  it('uses provided initial search term before localStorage value', () => {
    const providedSearchTerm = 'Morty';

    localStorage.setItem(LAST_SEARCH_TERM_STORAGE_KEY, 'Rick');

    const onInitialSearchTermLoaded = vi.fn();
    const onSearch = vi.fn();

    render(
      <SearchPanel
        initialSearchTerm={providedSearchTerm}
        onInitialSearchTermLoaded={onInitialSearchTermLoaded}
        onSearch={onSearch}
      />
    );

    expect(screen.getByLabelText(APP_MESSAGES.search.label)).toHaveValue(
      providedSearchTerm
    );
    expect(onInitialSearchTermLoaded).toHaveBeenCalledWith(providedSearchTerm);
  });
});
