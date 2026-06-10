import { APP_MESSAGES } from '../../constants/messages';
import styles from './PaginationControls.module.css';

interface PaginationControlsProps {
  currentPage: number;
  isDisabled?: boolean;
  onPageChange: (page: number) => void;
  totalPages: number;
}

function PaginationControls({
  currentPage,
  isDisabled = false,
  onPageChange,
  totalPages,
}: PaginationControlsProps) {
  const normalizedCurrentPage = Math.max(1, currentPage);
  const normalizedTotalPages = Math.max(1, totalPages);

  const isPreviousDisabled = isDisabled || normalizedCurrentPage <= 1;
  const isNextDisabled =
    isDisabled || normalizedCurrentPage >= normalizedTotalPages;

  function handlePreviousClick() {
    if (isPreviousDisabled) {
      return;
    }

    onPageChange(normalizedCurrentPage - 1);
  }

  function handleNextClick() {
    if (isNextDisabled) {
      return;
    }

    onPageChange(normalizedCurrentPage + 1);
  }

  return (
    <nav className={styles.pagination} aria-label="Character pages">
      <button
        className={styles.button}
        type="button"
        disabled={isPreviousDisabled}
        onClick={handlePreviousClick}
      >
        {APP_MESSAGES.pagination.previous}
      </button>

      <p className={styles.summary} aria-live="polite">
        {APP_MESSAGES.pagination.pageSummary(
          normalizedCurrentPage,
          normalizedTotalPages
        )}
      </p>

      <button
        className={styles.button}
        type="button"
        disabled={isNextDisabled}
        onClick={handleNextClick}
      >
        {APP_MESSAGES.pagination.next}
      </button>
    </nav>
  );
}

export default PaginationControls;
