import { APP_MESSAGES } from '../../constants/messages';
import styles from './ErrorTestButton.module.css';

interface ErrorTestButtonProps {
  onTriggerError: () => void;
}

function ErrorTestButton({ onTriggerError }: ErrorTestButtonProps) {
  return (
    <button className={styles.button} type="button" onClick={onTriggerError}>
      {APP_MESSAGES.errorTest.button}
    </button>
  );
}

export default ErrorTestButton;
