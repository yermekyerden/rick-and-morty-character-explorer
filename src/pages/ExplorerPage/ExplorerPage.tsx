import { useCallback, useState } from 'react';
import { Outlet } from 'react-router';

import ResultsSection from '../../components/ResultsSection/ResultsSection';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import SelectedCharactersFlyout from '../../components/SelectedCharactersFlyout/SelectedCharactersFlyout';
import { FIRST_PAGE_NUMBER } from '../../constants/api';
import { APP_MESSAGES } from '../../constants/messages';
import { useCharacterSearchParams } from '../../hooks/useCharacterSearchParams';
import { useCharacterPageQuery } from '../../query/useCharacterPageQuery';
import { useRefreshCharacterQueries } from '../../query/useRefreshCharacterQueries';
import {
  getSelectedCharacterCount,
  useSelectedCharactersStore,
} from '../../store/selectedCharactersStore';
import type { CharacterPageModel } from '../../types/character';
import styles from './ExplorerPage.module.css';

interface CharacterPageViewData {
  characters: CharacterPageModel['characters'];
  totalPages: number;
}

interface GetCharacterPageViewDataOptions {
  characterPage: CharacterPageModel | undefined;
  errorMessage: string | null;
}

function createShellClassName(hasSelectedCharacters: boolean): string {
  const classNames = [styles.shell];

  if (hasSelectedCharacters) {
    classNames.push(styles.shellWithSelectedFlyout);
  }

  return classNames.join(' ');
}

function createResultsSectionClassName(isDetailsOpen: boolean): string {
  const classNames = [styles.resultsSection];

  if (isDetailsOpen) {
    classNames.push(styles.resultsSectionWithDetails);
  }

  return classNames.join(' ');
}

function getCharacterLoadErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return APP_MESSAGES.apiErrors.unknown;
}

function getCharacterPageViewData({
  characterPage,
  errorMessage,
}: GetCharacterPageViewDataOptions): CharacterPageViewData {
  if (errorMessage !== null || characterPage === undefined) {
    return {
      characters: [],
      totalPages: FIRST_PAGE_NUMBER,
    };
  }

  return {
    characters: characterPage.characters,
    totalPages: characterPage.totalPages,
  };
}

function ExplorerPage() {
  const {
    hasSearchTerm,
    page,
    searchTerm: urlSearchTerm,
    selectedCharacterId,
    updateSearchParams,
  } = useCharacterSearchParams();

  const selectedCharactersById = useSelectedCharactersStore(
    (state) => state.selectedCharactersById
  );

  const [activeSearchTerm, setActiveSearchTerm] = useState('');
  const [isInitialSearchTermReady, setIsInitialSearchTermReady] =
    useState(false);
  const [shouldSimulateError, setShouldSimulateError] = useState(false);

  const characterPageQuery = useCharacterPageQuery({
    isEnabled: isInitialSearchTermReady,
    page,
    searchTerm: activeSearchTerm,
  });

  const refreshCharacterQueries = useRefreshCharacterQueries({
    page,
    searchTerm: activeSearchTerm,
    selectedCharacterId,
  });

  const handleInitialSearchTermLoaded = useCallback(
    (searchTerm: string) => {
      setActiveSearchTerm(searchTerm);
      setIsInitialSearchTermReady(true);

      updateSearchParams({
        page,
        replace: true,
        searchTerm,
      });
    },
    [page, updateSearchParams]
  );

  const handleSearch = useCallback(
    (searchTerm: string) => {
      setActiveSearchTerm(searchTerm);

      updateSearchParams({
        detailsId: null,
        page: FIRST_PAGE_NUMBER,
        searchTerm,
      });
    },
    [updateSearchParams]
  );

  const isCharacterPageQueryActive = isInitialSearchTermReady;
  const isLoading =
    isCharacterPageQueryActive &&
    (characterPageQuery.isPending || characterPageQuery.isFetching);

  const handlePageChange = useCallback(
    (nextPage: number) => {
      if (isLoading) {
        return;
      }

      updateSearchParams({
        detailsId: null,
        page: nextPage,
        searchTerm: activeSearchTerm,
      });
    },
    [activeSearchTerm, isLoading, updateSearchParams]
  );

  function handleRefreshDataClick() {
    void refreshCharacterQueries();
  }

  const triggerApplicationError = useCallback(() => {
    setShouldSimulateError(true);
  }, []);

  const handleCharacterSelect = useCallback(
    (characterId: number) => {
      updateSearchParams({
        detailsId: characterId,
        page,
        searchTerm: activeSearchTerm,
      });
    },
    [activeSearchTerm, page, updateSearchParams]
  );

  if (shouldSimulateError) {
    throw new Error(APP_MESSAGES.errorBoundary.simulatedError);
  }

  const selectedCharacterCount = getSelectedCharacterCount(
    selectedCharactersById
  );
  const hasSelectedCharacters = selectedCharacterCount > 0;
  const isDetailsOpen = selectedCharacterId !== null;
  const initialSearchTerm = hasSearchTerm ? urlSearchTerm : undefined;

  const hasLoadingError =
    isCharacterPageQueryActive && characterPageQuery.isError;

  const errorMessage = hasLoadingError
    ? getCharacterLoadErrorMessage(characterPageQuery.error)
    : null;

  const characterPageViewData = getCharacterPageViewData({
    characterPage: characterPageQuery.data,
    errorMessage,
  });
  const { characters, totalPages } = characterPageViewData;

  const shellClassName = createShellClassName(hasSelectedCharacters);
  const resultsSectionClassName = createResultsSectionClassName(isDetailsOpen);

  return (
    <main className={shellClassName}>
      <section className={styles.searchSection} aria-label="Character search">
        <header className={styles.intro}>
          <p className={styles.kicker}>{APP_MESSAGES.app.kicker}</p>

          <h1 className={styles.title}>{APP_MESSAGES.app.title}</h1>

          <p className={styles.description}>{APP_MESSAGES.app.description}</p>
        </header>

        <SearchPanel
          initialSearchTerm={initialSearchTerm}
          onInitialSearchTermLoaded={handleInitialSearchTermLoaded}
          onSearch={handleSearch}
        />
      </section>

      <section className={resultsSectionClassName} aria-label="Search results">
        <div className={styles.resultsPanel}>
          <ResultsSection
            characters={characters}
            currentPage={page}
            errorMessage={errorMessage}
            isLoading={isLoading}
            onCharacterSelect={handleCharacterSelect}
            onPageChange={handlePageChange}
            onRefreshData={handleRefreshDataClick}
            onTriggerError={triggerApplicationError}
            searchTerm={activeSearchTerm}
            totalPages={totalPages}
          />
        </div>

        {isDetailsOpen ? (
          <div className={styles.detailsPanelSlot}>
            <Outlet />
          </div>
        ) : null}
      </section>

      <SelectedCharactersFlyout />
    </main>
  );
}

export default ExplorerPage;
