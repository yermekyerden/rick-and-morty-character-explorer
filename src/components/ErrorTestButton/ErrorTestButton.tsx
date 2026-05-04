import { Component } from 'react';
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
        Trigger error
      </button>
    );
  }
}

export default ErrorTestButton;
