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
          <section className={styles.panel} aria-live="assertive">
            <p className={styles.kicker}>{APP_MESSAGES.errorBoundary.kicker}</p>

            <h1 className={styles.title}>{APP_MESSAGES.errorBoundary.title}</h1>

            <div className={styles.diagnostics} aria-hidden="true">
              <div className={styles.statusLight} />

              <div className={styles.signalStack}>
                <span className={styles.signalLine} />
                <span className={styles.signalLineShort} />
                <span className={styles.signalLineBroken} />
              </div>

              <p className={styles.diagnosticsLabel}>Boundary signal lost</p>
            </div>

            <p className={styles.text}>{APP_MESSAGES.errorBoundary.text}</p>

            <button
              className={styles.button}
              type="button"
              onClick={this.handleReloadClick}
            >
              {APP_MESSAGES.errorBoundary.reloadButton}
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
