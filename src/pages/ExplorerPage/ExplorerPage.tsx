import { useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { fetchCharacterPage } from '../../api/charactersApi';
import ResultsSection from '../../components/ResultsSection/ResultsSection';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import SelectedCharactersFlyout from '../../components/SelectedCharactersFlyout/SelectedCharactersFlyout';
import { FIRST_PAGE_NUMBER } from '../../constants/api';
import { APP_MESSAGES } from '../../constants/messages';
import { MIN_LOADING_TIME_IN_MS } from '../../constants/timing';
import { useCharacterSearchParams } from '../../hooks/useCharacterSearchParams';
import {
  getSelectedCharacterCount,
  useSelectedCharactersStore,
} from '../../store/selectedCharactersStore';
import type { CharacterCardModel } from '../../types/character';
import { delay } from '../../utils/delay';
import styles from './ExplorerPage.module.css';

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
  const [characters, setCharacters] = useState<CharacterCardModel[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isInitialSearchTermReady, setIsInitialSearchTermReady] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldSimulateError, setShouldSimulateError] = useState(false);
  const [totalPages, setTotalPages] = useState(FIRST_PAGE_NUMBER);

  useEffect(() => {
    if (!isInitialSearchTermReady) {
      return;
    }

    let isRequestActive = true;

    async function loadCharacters() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const [characterPage] = await Promise.all([
          fetchCharacterPage({
            searchTerm: activeSearchTerm,
            page,
          }),
          delay(MIN_LOADING_TIME_IN_MS),
        ]);

        if (!isRequestActive) {
          return;
        }

        setCharacters(characterPage.characters);
        setTotalPages(characterPage.totalPages);
        setIsLoading(false);
      } catch (error) {
        await delay(MIN_LOADING_TIME_IN_MS);

        if (!isRequestActive) {
          return;
        }

        setCharacters([]);
        setTotalPages(FIRST_PAGE_NUMBER);
        setIsLoading(false);
        setErrorMessage(getCharacterLoadErrorMessage(error));
      }
    }

    void loadCharacters();

    return () => {
      isRequestActive = false;
    };
  }, [activeSearchTerm, isInitialSearchTermReady, page]);

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
