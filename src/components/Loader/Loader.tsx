import { APP_MESSAGES } from '../../constants/messages';
import { SKELETON_CARD_COUNT } from '../../constants/ui';
import styles from './Loader.module.css';

function renderSkeletonCard(skeletonCardIndex: number) {
  return (
    <li className={styles.card} key={`skeleton-card-${skeletonCardIndex}`}>
      <div className={styles.imageFrame} aria-hidden="true">
        <div className={styles.image} />
      </div>

      <div className={styles.content}>
        <div className={styles.nameLine} aria-hidden="true" />

        <div className={styles.metaList} aria-hidden="true">
          <div className={styles.metaRow}>
            <div className={styles.metaLabel} />
            <div className={styles.metaValue} />
          </div>

          <div className={styles.metaRow}>
            <div className={styles.metaLabel} />
            <div className={styles.metaValue} />
          </div>

          <div className={styles.metaRow}>
            <div className={styles.metaLabel} />
            <div className={styles.metaValueLong} />
          </div>
        </div>
      </div>
    </li>
  );
}

function renderSkeletonCards() {
  return Array.from({ length: SKELETON_CARD_COUNT }, (_, skeletonCardIndex) =>
    renderSkeletonCard(skeletonCardIndex)
  );
}

function Loader() {
  return (
    <div className={styles.loader} aria-live="polite">
      <p className={styles.message}>{APP_MESSAGES.loader.message}</p>

      <ul className={styles.grid} aria-label={APP_MESSAGES.loader.ariaLabel}>
        {renderSkeletonCards()}
      </ul>
    </div>
  );
}

export default Loader;
