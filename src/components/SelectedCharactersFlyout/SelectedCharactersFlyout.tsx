import { APP_MESSAGES } from '../../constants/messages';
import {
  getSelectedCharacters,
  useSelectedCharactersStore,
} from '../../store/selectedCharactersStore';
import {
  createSelectedCharactersCsv,
  createSelectedCharactersCsvFileName,
} from '../../utils/createSelectedCharactersCsv';
import { downloadCsvFile } from '../../utils/downloadCsvFile';
import styles from './SelectedCharactersFlyout.module.css';

function SelectedCharactersFlyout() {
  const selectedCharactersById = useSelectedCharactersStore(
    (state) => state.selectedCharactersById
  );
  const clearSelectedCharacters = useSelectedCharactersStore(
    (state) => state.clearSelectedCharacters
  );

  const selectedCharacters = getSelectedCharacters(selectedCharactersById);

  function downloadSelectedCharacters() {
    const csvContent = createSelectedCharactersCsv(
      selectedCharacters,
      window.location.href
    );
    const fileName = createSelectedCharactersCsvFileName(
      selectedCharacters.length
    );

    downloadCsvFile({
      content: csvContent,
      fileName,
    });
  }

  function handleDownloadClick() {
    downloadSelectedCharacters();
  }

  const selectedCharacterCount = selectedCharacters.length;

  if (selectedCharacterCount === 0) {
    return null;
  }

  return (
    <aside
      className={styles.flyout}
      aria-label={APP_MESSAGES.selectedCharacters.title}
    >
      <div className={styles.content}>
        <div>
          <p className={styles.kicker}>
            {APP_MESSAGES.selectedCharacters.title}
          </p>

          <p className={styles.summary} aria-live="polite">
            {APP_MESSAGES.selectedCharacters.summary(selectedCharacterCount)}
          </p>

          <p className={styles.description}>
            {APP_MESSAGES.selectedCharacters.description}
          </p>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.secondaryButton}
            type="button"
            onClick={clearSelectedCharacters}
          >
            {APP_MESSAGES.selectedCharacters.unselectAll}
          </button>

          <button
            className={styles.primaryButton}
            type="button"
            onClick={handleDownloadClick}
          >
            {APP_MESSAGES.selectedCharacters.download}
          </button>
        </div>
      </div>
    </aside>
  );
}

export default SelectedCharactersFlyout;
