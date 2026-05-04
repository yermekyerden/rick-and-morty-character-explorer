import { Component } from 'react';
import styles from './NoResultsCard.module.css';

interface NoResultsCardProps {
  message: string;
}

class NoResultsCard extends Component<NoResultsCardProps> {
  render() {
    return (
      <article className={styles.card}>
        <div className={styles.icon} aria-hidden="true" />

        <div>
          <div className={styles.header}>
            <h3 className={styles.title}>No characters found</h3>

            <span className={styles.badge}>No signal</span>
          </div>

          <p className={styles.message}>{this.props.message}</p>

          <p className={styles.hint}>
            Try another name like Rick, Morty, Summer, or Beth.
          </p>
        </div>
      </article>
    );
  }
}

export default NoResultsCard;
