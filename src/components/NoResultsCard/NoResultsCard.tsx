import { APP_MESSAGES } from '../../constants/messages';
import styles from './NoResultsCard.module.css';

interface NoResultsCardProps {
  message: string;
}

function NoResultsCard({ message }: NoResultsCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.icon} aria-hidden="true" />

      <div>
        <div className={styles.header}>
          <h3 className={styles.title}>{APP_MESSAGES.noResults.title}</h3>

          <span className={styles.badge}>{APP_MESSAGES.noResults.badge}</span>
        </div>

        <p className={styles.message}>{message}</p>

        <p className={styles.hint}>{APP_MESSAGES.noResults.hint}</p>
      </div>
    </article>
  );
}

export default NoResultsCard;
