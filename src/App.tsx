import { Component } from 'react';
import { fetchCharacterCards } from './api/charactersApi';
import ResultsSection from './components/ResultsSection/ResultsSection';
import SearchPanel from './components/SearchPanel/SearchPanel';
import type { CharacterCardModel } from './types/character';
import styles from './App.module.css';

interface AppState {
  activeSearchTerm: string;
  characters: CharacterCardModel[];
  errorMessage: string | null;
  isLoading: boolean;
  shouldSimulateError: boolean;
}

const MIN_LOADING_TIME_IN_MS = 300;

function wait(delayInMilliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, delayInMilliseconds);
  });
}

class App extends Component<Record<string, never>, AppState> {
  state: AppState = {
    activeSearchTerm: '',
    characters: [],
    isLoading: false,
    errorMessage: null,
    shouldSimulateError: false,
  };

  handleInitialSearchTermLoaded = (searchTerm: string) => {
    this.setState({
      activeSearchTerm: searchTerm,
    });

    void this.loadCharacters(searchTerm);
  };

  handleSearch = (searchTerm: string) => {
    this.setState({
      activeSearchTerm: searchTerm,
    });

    void this.loadCharacters(searchTerm);
  };

  handleTriggerError = () => {
    this.setState({
      shouldSimulateError: true,
    });
  };

  loadCharacters = async (searchTerm: string) => {
    this.setState({
      isLoading: true,
      errorMessage: null,
    });

    try {
      const [characters] = await Promise.all([
        fetchCharacterCards(searchTerm),
        wait(MIN_LOADING_TIME_IN_MS),
      ]);

      this.setState({
        characters,
        isLoading: false,
      });
    } catch (error) {
      await wait(MIN_LOADING_TIME_IN_MS);

      this.setState({
        characters: [],
        isLoading: false,
        errorMessage:
          error instanceof Error
            ? error.message
            : 'Something went wrong while loading characters.',
      });
    }
  };

  render() {
    if (this.state.shouldSimulateError) {
      throw new Error('Simulated application error triggered by test button.');
    }

    return (
      <main className={styles.shell}>
        <section className={styles.searchSection} aria-label="Character search">
          <header className={styles.intro}>
            <p className={styles.kicker}>Rick and Morty API Explorer</p>

            <h1 className={styles.title}>Character Explorer</h1>

            <p className={styles.description}>
              Type a name, open a tiny portal, and hope the API sends back
              someone less dangerous than Rick.
            </p>
          </header>

          <SearchPanel
            onInitialSearchTermLoaded={this.handleInitialSearchTermLoaded}
            onSearch={this.handleSearch}
          />
        </section>

        <section className={styles.resultsSection} aria-label="Search results">
          <ResultsSection
            characters={this.state.characters}
            errorMessage={this.state.errorMessage}
            isLoading={this.state.isLoading}
            onTriggerError={this.handleTriggerError}
            searchTerm={this.state.activeSearchTerm}
          />
        </section>
      </main>
    );
  }
}

export default App;
