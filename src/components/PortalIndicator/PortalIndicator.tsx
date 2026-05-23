import styles from './PortalIndicator.module.css';

interface PortalIndicatorProps {
  isLoading: boolean;
  isUnstable: boolean;
}

function getPortalStateClassName({
  isLoading,
  isUnstable,
}: PortalIndicatorProps): string {
  if (isUnstable) {
    return styles.unstable;
  }

  if (isLoading) {
    return styles.loading;
  }

  return styles.stable;
}

function PortalIndicator({ isLoading, isUnstable }: PortalIndicatorProps) {
  const stateClassName = getPortalStateClassName({
    isLoading,
    isUnstable,
  });

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
