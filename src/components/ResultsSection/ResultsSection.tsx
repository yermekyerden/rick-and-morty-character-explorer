import { Component } from 'react';
import styles from './ResultsSection.module.css';

interface ResultsSectionProps {
  searchTerm: string;
}

class ResultsSection extends Component<ResultsSectionProps> {
  renderStatusText() {
    if (this.props.searchTerm.length === 0) {
      return 'Waiting for coordinates';
    }

    return `Coordinates locked: "${this.props.searchTerm}"`;
  }

  renderDescription() {
    if (this.props.searchTerm.length === 0) {
      return 'Soon this area will show the first page of all characters from the API.';
    }

    return 'Soon this area will show the first page of matching characters from the API.';
  }

  render() {
    return (
      <div className={styles.placeholder}>
        <div className={styles.portal} aria-hidden="true" />

        <div>
          <p className={styles.status}>{this.renderStatusText()}</p>

          <h2 className={styles.title}>No characters loaded yet</h2>

          <p className={styles.text}>{this.renderDescription()}</p>
        </div>
      </div>
    );
  }
}

export default ResultsSection;
