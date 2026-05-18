import { APP_MESSAGES } from '../../constants/messages';
import type { CharacterCardModel } from '../../types/character';
import CharacterList from '../CharacterList/CharacterList';
import ErrorTestButton from '../ErrorTestButton/ErrorTestButton';
import Loader from '../Loader/Loader';
import NoResultsCard from '../NoResultsCard/NoResultsCard';
import styles from './ResultsSection.module.css';

interface ResultsSectionProps {
  characters: CharacterCardModel[];
  errorMessage: string | null;
  isLoading: boolean;
  onTriggerError: () => void;
  searchTerm: string;
}

function getStatusText({
  errorMessage,
  isLoading,
  searchTerm,
}: Pick<ResultsSectionProps, 'errorMessage' | 'isLoading' | 'searchTerm'>) {
  if (isLoading) {
    return APP_MESSAGES.results.status.loading;
  }

  if (errorMessage !== null) {
    return APP_MESSAGES.results.status.unstable;
  }

  if (searchTerm.length === 0) {
    return APP_MESSAGES.results.status.firstPage;
  }

  return APP_MESSAGES.results.status.coordinatesLocked(searchTerm);
}

function renderResultsContent({
  characters,
  errorMessage,
  isLoading,
}: Pick<ResultsSectionProps, 'characters' | 'errorMessage' | 'isLoading'>) {
  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage !== null) {
    return <NoResultsCard message={errorMessage} />;
  }

  if (characters.length === 0) {
    return (
      <div className={styles.state}>
        <p className={styles.stateText}>{APP_MESSAGES.results.empty}</p>
      </div>
    );
  }

  return <CharacterList characters={characters} />;
}

function ResultsSection({
  characters,
  errorMessage,
  isLoading,
  onTriggerError,
  searchTerm,
}: ResultsSectionProps) {
  const isPortalUnstable = errorMessage !== null;
  const statusText = getStatusText({ errorMessage, isLoading, searchTerm });

  return (
    <div className={styles.panel}>
      <div className={styles.portalRail}>
        <div
          className={`${styles.portal} ${isPortalUnstable ? styles.portalDanger : ''}`}
          aria-hidden="true"
        />
      </div>

      <div className={styles.body}>
        <header className={styles.header}>
          <p className={styles.status}>{statusText}</p>

          <h2 className={styles.title}>{APP_MESSAGES.results.title}</h2>
        </header>

        <div className={styles.content}>
          {renderResultsContent({ characters, errorMessage, isLoading })}
        </div>

        <div className={styles.footer}>
          <ErrorTestButton onTriggerError={onTriggerError} />
        </div>
      </div>
    </div>
  );
}

export default ResultsSection;
