import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { APP_MESSAGES } from '../../constants/messages';
import { testCharacterCard } from '../../test/testCharacters';
import ResultsSection from './ResultsSection';

function handleTriggerError() {}

describe('ResultsSection', () => {
  it('renders first page status when search term is empty', () => {
    const expectedStatus = APP_MESSAGES.results.status.firstPage;
    const expectedTitle = APP_MESSAGES.results.title;

    render(
      <ResultsSection
        characters={[]}
        errorMessage={null}
        isLoading={false}
        onTriggerError={handleTriggerError}
        searchTerm=""
      />
    );

    expect(screen.getByText(expectedStatus)).toBeVisible();
    expect(screen.getByRole('heading', { name: expectedTitle })).toBeVisible();
  });

  it('renders coordinates status when search term is provided', () => {
    const searchTerm = 'Rick';
    const expectedStatus =
      APP_MESSAGES.results.status.coordinatesLocked(searchTerm);

    render(
      <ResultsSection
        characters={[]}
        errorMessage={null}
        isLoading={false}
        onTriggerError={handleTriggerError}
        searchTerm={searchTerm}
      />
    );

    expect(screen.getByText(expectedStatus)).toBeVisible();
  });

  it('renders loader when results are loading', () => {
    const expectedStatus = APP_MESSAGES.results.status.loading;
    const expectedLoadingMessage = APP_MESSAGES.loader.message;

    render(
      <ResultsSection
        characters={[]}
        errorMessage={null}
        isLoading={true}
        onTriggerError={handleTriggerError}
        searchTerm=""
      />
    );

    expect(screen.getByText(expectedStatus)).toBeVisible();
    expect(screen.getByText(expectedLoadingMessage)).toBeVisible();
  });

  it('renders no-results card when error message is provided', () => {
    const expectedStatus = APP_MESSAGES.results.status.unstable;
    const expectedTitle = APP_MESSAGES.noResults.title;
    const expectedErrorMessage = APP_MESSAGES.apiErrors.notFound;

    render(
      <ResultsSection
        characters={[]}
        errorMessage={expectedErrorMessage}
        isLoading={false}
        onTriggerError={handleTriggerError}
        searchTerm="Nobody"
      />
    );

    expect(screen.getByText(expectedStatus)).toBeVisible();
    expect(screen.getByRole('heading', { name: expectedTitle })).toBeVisible();
    expect(screen.getByText(expectedErrorMessage)).toBeVisible();
  });

  it('renders empty state when no characters are available', () => {
    const expectedEmptyMessage = APP_MESSAGES.results.empty;

    render(
      <ResultsSection
        characters={[]}
        errorMessage={null}
        isLoading={false}
        onTriggerError={handleTriggerError}
        searchTerm=""
      />
    );

    expect(screen.getByText(expectedEmptyMessage)).toBeVisible();
  });

  it('renders character list when characters are available', () => {
    const expectedName = testCharacterCard.name;
    const expectedDescription = testCharacterCard.description;

    render(
      <ResultsSection
        characters={[testCharacterCard]}
        errorMessage={null}
        isLoading={false}
        onTriggerError={handleTriggerError}
        searchTerm="Rick"
      />
    );

    expect(screen.getByRole('heading', { name: expectedName })).toBeVisible();
    expect(screen.getByText(expectedDescription)).toBeVisible();
  });
});
