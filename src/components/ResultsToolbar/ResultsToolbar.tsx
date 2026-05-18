import { APP_MESSAGES } from '../../constants/messages';
import ErrorTestButton from '../ErrorTestButton/ErrorTestButton';
import PortalIndicator from '../PortalIndicator/PortalIndicator';
import styles from './ResultsToolbar.module.css';

interface ResultsToolbarProps {
  isLoading: boolean;
  isUnstable: boolean;
  onTriggerError: () => void;
  statusText: string;
}

function ResultsToolbar({
  isLoading,
  isUnstable,
  onTriggerError,
  statusText,
}: ResultsToolbarProps) {
  return (
    <header className={styles.toolbar}>
      <div className={styles.titleGroup}>
        <PortalIndicator isLoading={isLoading} isUnstable={isUnstable} />

        <div className={styles.copy}>
          <p className={styles.status}>{statusText}</p>

          <h2 className={styles.title}>{APP_MESSAGES.results.title}</h2>
        </div>
      </div>

      <div className={styles.actions}>
        <ErrorTestButton onTriggerError={onTriggerError} />
      </div>
    </header>
  );
}

export default ResultsToolbar;
