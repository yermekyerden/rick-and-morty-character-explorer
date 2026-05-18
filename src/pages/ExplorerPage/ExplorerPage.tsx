import { Component } from 'react';
import { fetchCharacterCards } from '../../api/charactersApi';
import ResultsSection from '../../components/ResultsSection/ResultsSection';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import { APP_MESSAGES } from '../../constants/messages';
import { MIN_LOADING_TIME_IN_MS } from '../../constants/timing';
import type { CharacterCardModel } from '../../types/character';
import { delay } from '../../utils/delay';
import styles from './ExplorerPage.module.css';

interface ExplorerPageState {
  activeSearchTerm: string;
  characters: CharacterCardModel[];
  errorMessage: string | null;
  isLoading: boolean;
  shouldSimulateError: boolean;
}

class ExplorerPage extends Component<Record<string, never>, ExplorerPageState> {
  state: ExplorerPageState = {
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
        delay(MIN_LOADING_TIME_IN_MS),
      ]);

      this.setState({
        characters,
        isLoading: false,
      });
    } catch (error) {
      await delay(MIN_LOADING_TIME_IN_MS);

      this.setState({
        characters: [],
        isLoading: false,
        errorMessage:
          error instanceof Error
            ? error.message
            : APP_MESSAGES.apiErrors.unknown,
      });
    }
  };

  render() {
    if (this.state.shouldSimulateError) {
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

export default ExplorerPage;
