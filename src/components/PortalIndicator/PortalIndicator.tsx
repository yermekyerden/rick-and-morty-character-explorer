import styles from './PortalIndicator.module.css';

interface PortalIndicatorProps {
  isLoading: boolean;
  isUnstable: boolean;
}

function PortalIndicator({ isLoading, isUnstable }: PortalIndicatorProps) {
  const stateClassName = isUnstable
    ? styles.unstable
    : isLoading
      ? styles.loading
      : styles.stable;

  return (
    <div
      className={`${styles.portalShell} ${stateClassName}`}
      aria-hidden="true"
    >
      <div className={styles.portalCore} />
    </div>
  );
}

export default PortalIndicator;
