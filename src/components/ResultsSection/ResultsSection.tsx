import { Component } from 'react';
import type { CharacterCardModel } from '../../types/character';
import Loader from '../Loader/Loader';
import CharacterList from '../CharacterList/CharacterList';
import ErrorTestButton from '../ErrorTestButton/ErrorTestButton';
import styles from './ResultsSection.module.css';

interface ResultsSectionProps {
  characters: CharacterCardModel[];
  errorMessage: string | null;
  isLoading: boolean;
  onTriggerError: () => void;
  searchTerm: string;
}

class ResultsSection extends Component<ResultsSectionProps> {
  renderStatusText() {
    if (this.props.isLoading) {
      return 'Opening portal';
    }

    if (this.props.errorMessage !== null) {
      return 'Portal failed';
    }

    if (this.props.searchTerm.length === 0) {
      return 'Showing first page';
    }

    return `Coordinates locked: "${this.props.searchTerm}"`;
  }

  renderContent() {
    if (this.props.isLoading) {
      return <Loader />;
    }

    if (this.props.errorMessage !== null) {
      return (
        <div className={styles.state}>
          <div className={styles.noResultsLayout}>
            <div
              className={`${styles.portal} ${styles.portalDanger} ${styles.portalInline}`}
              aria-hidden="true"
            />

            <div className={styles.errorCard}>
              <p className={styles.errorKicker}>No matching signal</p>

              <h3 className={styles.errorTitle}>No characters found</h3>

              <p className={styles.stateError}>{this.props.errorMessage}</p>

              <p className={styles.errorHint}>
                Try another name like Rick, Morty, Summer, or Beth.
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (this.props.characters.length === 0) {
      return (
        <div className={styles.state}>
          <p className={styles.stateText}>
            No characters loaded yet. The portal is suspiciously quiet.
          </p>
        </div>
      );
    }

    return <CharacterList characters={this.props.characters} />;
  }

  render() {
    return (
      <div className={styles.placeholder}>
        {this.props.errorMessage === null ? (
          <div className={styles.portal} aria-hidden="true" />
        ) : null}

        <div>
          <p className={styles.status}>{this.renderStatusText()}</p>

          <h2 className={styles.title}>Character results</h2>

          <div className={styles.content}>{this.renderContent()}</div>

          <div className={styles.footer}>
            <ErrorTestButton onTriggerError={this.props.onTriggerError} />
          </div>
        </div>
      </div>
    );
  }
}

export default ResultsSection;
