import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { APP_MESSAGES } from '../../constants/messages';
import { testCharacterCard } from '../../test/testCharacters';
import type { CharacterCardModel } from '../../types/character';
import ResultsSection from './ResultsSection';

interface RenderResultsSectionOptions {
  characters?: CharacterCardModel[];
  currentPage?: number;
  errorMessage?: string | null;
  isLoading?: boolean;
  onPageChange?: (page: number) => void;
  onTriggerError?: () => void;
  searchTerm?: string;
  totalPages?: number;
}

function renderResultsSection({
  characters = [],
  currentPage = 1,
  errorMessage = null,
  isLoading = false,
  onPageChange = () => {},
  onTriggerError = () => {},
  searchTerm = '',
  totalPages = 1,
}: RenderResultsSectionOptions = {}) {
  render(
    <ResultsSection
      characters={characters}
      currentPage={currentPage}
      errorMessage={errorMessage}
      isLoading={isLoading}
      onPageChange={onPageChange}
      onTriggerError={onTriggerError}
      searchTerm={searchTerm}
      totalPages={totalPages}
    />
  );
}

describe('ResultsSection', () => {
  it('renders first page status when search term is empty', () => {
    const expectedStatus = APP_MESSAGES.results.status.browsingPage(1, 1);
    const expectedTitle = APP_MESSAGES.results.title;

    renderResultsSection();

    expect(screen.getByText(expectedStatus)).toBeVisible();
    expect(screen.getByRole('heading', { name: expectedTitle })).toBeVisible();
  });

  it('renders coordinates status when search term is provided', () => {
    const searchTerm = 'Rick';
    const expectedStatus = APP_MESSAGES.results.status.coordinatesLocked(
      searchTerm,
      1,
      1
    );

    renderResultsSection({ searchTerm });

    expect(screen.getByText(expectedStatus)).toBeVisible();
  });

  it('renders loader when results are loading', () => {
    const expectedStatus = APP_MESSAGES.results.status.loading;
    const expectedLoadingMessage = APP_MESSAGES.loader.message;

    renderResultsSection({ isLoading: true });

    expect(screen.getByText(expectedStatus)).toBeVisible();
    expect(screen.getByText(expectedLoadingMessage)).toBeVisible();
  });

  it('renders no-results card when error message is provided', () => {
    const expectedStatus = APP_MESSAGES.results.status.unstable;
    const expectedTitle = APP_MESSAGES.noResults.title;
    const expectedErrorMessage = APP_MESSAGES.apiErrors.notFound;

    renderResultsSection({
      errorMessage: expectedErrorMessage,
      searchTerm: 'Nobody',
    });

    expect(screen.getByText(expectedStatus)).toBeVisible();
    expect(screen.getByRole('heading', { name: expectedTitle })).toBeVisible();
    expect(screen.getByText(expectedErrorMessage)).toBeVisible();
  });

  it('renders empty state when no characters are available', () => {
    const expectedEmptyMessage = APP_MESSAGES.results.empty;

    renderResultsSection();

    expect(screen.getByText(expectedEmptyMessage)).toBeVisible();
  });

  it('renders character grid when characters are available', () => {
    const expectedName = testCharacterCard.name;
    const expectedLocation = testCharacterCard.locationName;

    renderResultsSection({
      characters: [testCharacterCard],
      searchTerm: 'Rick',
    });

    expect(screen.getByRole('heading', { name: expectedName })).toBeVisible();
    expect(screen.getByText(expectedLocation)).toBeVisible();
  });

  it('renders pagination controls after characters are loaded', () => {
    renderResultsSection({
      characters: [testCharacterCard],
      currentPage: 2,
      totalPages: 5,
    });

    expect(
      screen.getByText(APP_MESSAGES.pagination.pageSummary(2, 5))
    ).toBeVisible();
  });

  it('keeps pagination visible but disables controls while loading', () => {
    renderResultsSection({
      characters: [testCharacterCard],
      isLoading: true,
      totalPages: 5,
    });

    expect(
      screen.getByText(APP_MESSAGES.pagination.pageSummary(1, 5))
    ).toBeVisible();

    expect(
      screen.getByRole('button', {
        name: APP_MESSAGES.pagination.previous,
      })
    ).toBeDisabled();

    expect(
      screen.getByRole('button', {
        name: APP_MESSAGES.pagination.next,
      })
    ).toBeDisabled();
  });

  it('calls onPageChange when pagination changes page', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    renderResultsSection({
      characters: [testCharacterCard],
      currentPage: 1,
      onPageChange,
      totalPages: 5,
    });

    await user.click(
      screen.getByRole('button', {
        name: APP_MESSAGES.pagination.next,
      })
    );

    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
