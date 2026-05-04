import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
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
    console.error(
      'Application error caught by ErrorBoundary:',
      error,
      errorInfo
    );
  }

  handleReloadClick = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className={styles.shell}>
          <section className={styles.card} aria-live="assertive">
            <p className={styles.kicker}>Emergency shutdown</p>

            <h1 className={styles.title}>The portal collapsed</h1>

            <p className={styles.text}>
              A rendering error was caught by the application boundary. Reload
              the page to reopen the portal and continue exploring characters.
            </p>

            <div className={styles.actions}>
              <button
                className={styles.button}
                type="button"
                onClick={this.handleReloadClick}
              >
                Reload app
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
