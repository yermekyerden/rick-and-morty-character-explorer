import { useCallback, useState } from 'react';
import { fetchCharacterCards } from '../../api/charactersApi';
import ResultsSection from '../../components/ResultsSection/ResultsSection';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import { APP_MESSAGES } from '../../constants/messages';
import { MIN_LOADING_TIME_IN_MS } from '../../constants/timing';
import type { CharacterCardModel } from '../../types/character';
import { delay } from '../../utils/delay';
import styles from './ExplorerPage.module.css';

function ExplorerPage() {
  const [activeSearchTerm, setActiveSearchTerm] = useState('');
  const [characters, setCharacters] = useState<CharacterCardModel[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldSimulateError, setShouldSimulateError] = useState(false);

  const loadCharacters = useCallback(async (searchTerm: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const [loadedCharacters] = await Promise.all([
        fetchCharacterCards(searchTerm),
        delay(MIN_LOADING_TIME_IN_MS),
      ]);

      setCharacters(loadedCharacters);
      setIsLoading(false);
    } catch (error) {
      await delay(MIN_LOADING_TIME_IN_MS);

      setCharacters([]);
      setIsLoading(false);
      setErrorMessage(
        error instanceof Error ? error.message : APP_MESSAGES.apiErrors.unknown
      );
    }
  }, []);

  const handleInitialSearchTermLoaded = useCallback(
    (searchTerm: string) => {
      setActiveSearchTerm(searchTerm);

      void loadCharacters(searchTerm);
    },
    [loadCharacters]
  );

  const handleSearch = useCallback(
    (searchTerm: string) => {
      setActiveSearchTerm(searchTerm);

      void loadCharacters(searchTerm);
    },
    [loadCharacters]
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
          onInitialSearchTermLoaded={handleInitialSearchTermLoaded}
          onSearch={handleSearch}
        />
      </section>

      <section className={styles.resultsSection} aria-label="Search results">
        <ResultsSection
          characters={characters}
          errorMessage={errorMessage}
          isLoading={isLoading}
          onTriggerError={handleTriggerError}
          searchTerm={activeSearchTerm}
        />
      </section>
    </main>
  );
}

export default ExplorerPage;
