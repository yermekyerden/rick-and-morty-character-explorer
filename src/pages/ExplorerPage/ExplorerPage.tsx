import { useCallback, useEffect, useState } from 'react';
import { fetchCharacterPage } from '../../api/charactersApi';
import ResultsSection from '../../components/ResultsSection/ResultsSection';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import { FIRST_PAGE_NUMBER } from '../../constants/api';
import { APP_MESSAGES } from '../../constants/messages';
import { MIN_LOADING_TIME_IN_MS } from '../../constants/timing';
import { useCharacterSearchParams } from '../../hooks/useCharacterSearchParams';
import type { CharacterCardModel } from '../../types/character';
import { delay } from '../../utils/delay';
import styles from './ExplorerPage.module.css';

function ExplorerPage() {
  const {
    hasSearchTerm,
    page,
    searchTerm: urlSearchTerm,
    updateSearchParams,
  } = useCharacterSearchParams();

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
        setErrorMessage(
          error instanceof Error
            ? error.message
            : APP_MESSAGES.apiErrors.unknown
        );
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
        detailsId: null,
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

  const handleTriggerError = useCallback(() => {
    setShouldSimulateError(true);
  }, []);

  if (shouldSimulateError) {
    throw new Error(APP_MESSAGES.errorBoundary.simulatedError);
  }

  return (
    <main className={styles.shell}>
      <section className={styles.searchSection} aria-label="Character search">
        <header className={styles.intro}>
          <p className={styles.kicker}>{APP_MESSAGES.app.kicker}</p>

          <h1 className={styles.title}>{APP_MESSAGES.app.title}</h1>

          <p className={styles.description}>{APP_MESSAGES.app.description}</p>
        </header>

        <SearchPanel
          initialSearchTerm={hasSearchTerm ? urlSearchTerm : undefined}
          onInitialSearchTermLoaded={handleInitialSearchTermLoaded}
          onSearch={handleSearch}
        />
      </section>

      <section className={styles.resultsSection} aria-label="Search results">
        <ResultsSection
          characters={characters}
          currentPage={page}
          errorMessage={errorMessage}
          isLoading={isLoading}
          onPageChange={handlePageChange}
          onTriggerError={handleTriggerError}
          searchTerm={activeSearchTerm}
          totalPages={totalPages}
        />
      </section>
    </main>
  );
}

export default ExplorerPage;
