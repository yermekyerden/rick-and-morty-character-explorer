import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { APP_MESSAGES } from '../../constants/messages';
import styles from './ErrorBoundary.module.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(APP_MESSAGES.errorBoundary.consolePrefix, error, errorInfo);
  }

  handleReloadClick = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className={styles.shell}>
          <section className={styles.card} aria-live="assertive">
            <p className={styles.kicker}>{APP_MESSAGES.errorBoundary.kicker}</p>

            <h1 className={styles.title}>{APP_MESSAGES.errorBoundary.title}</h1>

            <p className={styles.text}>{APP_MESSAGES.errorBoundary.text}</p>

            <div className={styles.actions}>
              <button
                className={styles.button}
                type="button"
                onClick={this.handleReloadClick}
              >
                {APP_MESSAGES.errorBoundary.reloadButton}
              </button>
            </div>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
