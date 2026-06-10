import styles from './PortalIndicator.module.css';

interface PortalIndicatorProps {
  isLoading: boolean;
  isUnstable: boolean;
}

interface PortalStateOptions {
  isLoading: boolean;
  isUnstable: boolean;
}

function getPortalStateClassName({
  isLoading,
  isUnstable,
}: PortalStateOptions): string {
  if (isUnstable) {
    return styles.unstable;
  }

  if (isLoading) {
    return styles.loading;
  }

  return styles.stable;
}

function createPortalClassName({
  isLoading,
  isUnstable,
}: PortalStateOptions): string {
  const stateClassName = getPortalStateClassName({
    isLoading,
    isUnstable,
  });

  return `${styles.portalShell} ${stateClassName}`;
}

function PortalIndicator({ isLoading, isUnstable }: PortalIndicatorProps) {
  const portalClassName = createPortalClassName({
    isLoading,
    isUnstable,
  });

  return (
    <div className={portalClassName} aria-hidden="true">
      <div className={styles.portalCore} />
    </div>
  );
}

export default PortalIndicator;
