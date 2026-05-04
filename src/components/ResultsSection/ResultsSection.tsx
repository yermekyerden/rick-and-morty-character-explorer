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
      return <p className={styles.error}>{this.props.errorMessage}</p>;
    }

    if (this.props.characters.length === 0) {
      return (
        <p className={styles.text}>
          No characters loaded yet. The portal is suspiciously quiet.
        </p>
      );
    }

    return <CharacterList characters={this.props.characters} />;
  }

  render() {
    return (
      <div className={styles.placeholder}>
        <div className={styles.portal} aria-hidden="true" />

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
