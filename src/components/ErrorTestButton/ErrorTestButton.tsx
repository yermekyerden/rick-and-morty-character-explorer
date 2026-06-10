import { Component } from 'react';
import { APP_MESSAGES } from '../../constants/messages';
import styles from './ErrorTestButton.module.css';

interface ErrorTestButtonProps {
  onTriggerError: () => void;
}

class ErrorTestButton extends Component<ErrorTestButtonProps> {
  render() {
    return (
      <button
        className={styles.button}
        type="button"
        onClick={this.props.onTriggerError}
      >
        {APP_MESSAGES.errorTest.button}
      </button>
    );
  }
}

export default ErrorTestButton;
