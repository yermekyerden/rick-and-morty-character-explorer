import { Component } from 'react';
import ResultsSection from './components/ResultsSection/ResultsSection';
import SearchPanel from './components/SearchPanel/SearchPanel';
import styles from './App.module.css';

interface AppState {
  activeSearchTerm: string;
}

class App extends Component<Record<string, never>, AppState> {
  state: AppState = {
    activeSearchTerm: '',
  };

  handleSearch = (searchTerm: string) => {
    this.setState({
      activeSearchTerm: searchTerm,
    });
  };

  render() {
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

          <SearchPanel onSearch={this.handleSearch} />
        </section>

        <section className={styles.resultsSection} aria-label="Search results">
          <ResultsSection searchTerm={this.state.activeSearchTerm} />
        </section>
      </main>
    );
  }
}

export default App;
