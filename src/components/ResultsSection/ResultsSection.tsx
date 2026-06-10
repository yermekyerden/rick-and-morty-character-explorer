import { Component } from 'react';
import type { CharacterCardModel } from '../../types/character';
import CharacterList from '../CharacterList/CharacterList';
import ErrorTestButton from '../ErrorTestButton/ErrorTestButton';
import Loader from '../Loader/Loader';
import NoResultsCard from '../NoResultsCard/NoResultsCard';
import { APP_MESSAGES } from '../../constants/messages';
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
      return APP_MESSAGES.results.status.loading;
    }

    if (this.props.errorMessage !== null) {
      return APP_MESSAGES.results.status.unstable;
    }

    if (this.props.searchTerm.length === 0) {
      return APP_MESSAGES.results.status.firstPage;
    }

    return APP_MESSAGES.results.status.coordinatesLocked(this.props.searchTerm);
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
          <p className={styles.stateText}>{APP_MESSAGES.results.empty}</p>
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

            <h2 className={styles.title}>{APP_MESSAGES.results.title}</h2>
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
