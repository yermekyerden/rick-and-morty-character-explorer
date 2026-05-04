import { Component } from 'react';
import styles from './ResultsSection.module.css';

class ResultsSection extends Component {
  render() {
    return (
      <div className={styles.placeholder}>
        <div className={styles.portal} aria-hidden="true" />

        <div>
          <p className={styles.status}>Waiting for coordinates</p>

          <h2 className={styles.title}>No characters loaded yet</h2>

          <p className={styles.text}>
            Soon this area will show cards with character names, descriptions,
            and API-powered chaos.
          </p>
        </div>
      </div>
    );
  }
}

export default ResultsSection;
