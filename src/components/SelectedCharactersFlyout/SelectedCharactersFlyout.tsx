import { APP_MESSAGES } from '../../constants/messages';
import {
  getSelectedCharacterCount,
  useSelectedCharactersStore,
} from '../../store/selectedCharactersStore';
import styles from './SelectedCharactersFlyout.module.css';

function SelectedCharactersFlyout() {
  const selectedCharactersById = useSelectedCharactersStore(
    (state) => state.selectedCharactersById
  );
  const clearSelectedCharacters = useSelectedCharactersStore(
    (state) => state.clearSelectedCharacters
  );

  const selectedCharacterCount = getSelectedCharacterCount(
    selectedCharactersById
  );

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
            disabled
            title={APP_MESSAGES.selectedCharacters.downloadUnavailable}
          >
            {APP_MESSAGES.selectedCharacters.download}
          </button>
        </div>
      </div>
    </aside>
  );
}

export default SelectedCharactersFlyout;
