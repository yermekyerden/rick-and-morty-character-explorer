import { Component } from 'react';
import ResultsSection from './components/ResultsSection/ResultsSection';
import styles from './App.module.css';

class App extends Component {
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

          <div className={styles.panel}>
            <label className={styles.label} htmlFor="character-search">
              Character name
            </label>

            <div className={styles.field}>
              <input
                id="character-search"
                type="text"
                placeholder="Try Rick, Morty, Summer..."
                disabled
              />

              <button type="button" disabled>
                Search
              </button>
            </div>

            <p className={styles.hint}>
              The real search panel will arrive in the next commit.
            </p>
          </div>
        </section>

        <section className={styles.resultsSection} aria-label="Search results">
          <ResultsSection />
        </section>
      </main>
    );
  }
}

export default App;
