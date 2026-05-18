import { APP_MESSAGES } from '../../constants/messages';
import { SKELETON_CARD_COUNT } from '../../constants/ui';
import styles from './Loader.module.css';

function renderSkeletonCards() {
  return Array.from({ length: SKELETON_CARD_COUNT }, (_, itemIndex) => (
    <li className={styles.card} key={itemIndex}>
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
  ));
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
