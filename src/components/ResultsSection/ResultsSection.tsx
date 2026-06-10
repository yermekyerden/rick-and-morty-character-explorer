import { APP_MESSAGES } from '../../constants/messages';
import type { CharacterCardModel } from '../../types/character';
import CharacterGrid from '../CharacterGrid/CharacterGrid';
import Loader from '../Loader/Loader';
import NoResultsCard from '../NoResultsCard/NoResultsCard';
import PaginationControls from '../PaginationControls/PaginationControls';
import ResultsToolbar from '../ResultsToolbar/ResultsToolbar';
import styles from './ResultsSection.module.css';

interface ResultsSectionProps {
  characters: CharacterCardModel[];
  currentPage: number;
  errorMessage: string | null;
  isLoading: boolean;
  onCharacterSelect: (characterId: number) => void;
  onPageChange: (page: number) => void;
  onTriggerError: () => void;
  searchTerm: string;
  totalPages: number;
}

interface GetStatusTextOptions {
  currentPage: number;
  errorMessage: string | null;
  isLoading: boolean;
  searchTerm: string;
  totalPages: number;
}

interface RenderResultsContentOptions {
  characters: CharacterCardModel[];
  errorMessage: string | null;
  isLoading: boolean;
  onCharacterSelect: (characterId: number) => void;
}

function getStatusText({
  currentPage,
  errorMessage,
  isLoading,
  searchTerm,
  totalPages,
}: GetStatusTextOptions) {
  if (isLoading) {
    return APP_MESSAGES.results.status.loading;
  }

  if (errorMessage !== null) {
    return APP_MESSAGES.results.status.unstable;
  }

  if (searchTerm.length === 0) {
    return APP_MESSAGES.results.status.browsingPage(currentPage, totalPages);
  }

  return APP_MESSAGES.results.status.coordinatesLocked(
    searchTerm,
    currentPage,
    totalPages
  );
}

function renderResultsContent({
  characters,
  errorMessage,
  isLoading,
  onCharacterSelect,
}: RenderResultsContentOptions) {
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

  return (
    <CharacterGrid
      characters={characters}
      onCharacterSelect={onCharacterSelect}
    />
  );
}

function ResultsSection({
  characters,
  currentPage,
  errorMessage,
  isLoading,
  onCharacterSelect,
  onPageChange,
  onTriggerError,
  searchTerm,
  totalPages,
}: ResultsSectionProps) {
  const isPortalUnstable = errorMessage !== null;
  const statusText = getStatusText({
    currentPage,
    errorMessage,
    isLoading,
    searchTerm,
    totalPages,
  });
  const shouldShowPagination = errorMessage === null && characters.length > 0;

  return (
    <div className={styles.panel}>
      <ResultsToolbar
        isLoading={isLoading}
        isUnstable={isPortalUnstable}
        onTriggerError={onTriggerError}
        statusText={statusText}
      />

      <div className={styles.content}>
        {renderResultsContent({
          characters,
          errorMessage,
          isLoading,
          onCharacterSelect,
        })}
      </div>

      <footer className={styles.footer}>
        {shouldShowPagination ? (
          <PaginationControls
            currentPage={currentPage}
            isDisabled={isLoading}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        ) : null}
      </footer>
    </div>
  );
}

export default ResultsSection;
