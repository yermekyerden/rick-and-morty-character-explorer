import { Component } from 'react';
import type { CharacterCardModel } from '../../types/character';
import CharacterList from '../CharacterList/CharacterList';
import NoResultsCard from '../NoResultsCard/NoResultsCard';
import ErrorTestButton from '../ErrorTestButton/ErrorTestButton';
import Loader from '../Loader/Loader';
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
      return 'Portal unstable';
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
      return <NoResultsCard message={this.props.errorMessage} />;
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
    const isPortalUnstable = this.props.errorMessage !== null;

    return (
      <div className={styles.panel}>
        <div className={styles.portalRail}>
          <div
            className={`${styles.portal} ${
              isPortalUnstable ? styles.portalDanger : ''
            }`}
            aria-hidden="true"
          />
        </div>

        <div className={styles.body}>
          <header className={styles.header}>
            <p className={styles.status}>{this.renderStatusText()}</p>

            <h2 className={styles.title}>Character results</h2>
          </header>

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
