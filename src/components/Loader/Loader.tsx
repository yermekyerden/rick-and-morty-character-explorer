import { Component } from 'react';
import { APP_MESSAGES } from '../../constants/messages';
import { SKELETON_CARD_COUNT } from '../../constants/ui';
import styles from './Loader.module.css';

class Loader extends Component {
  renderSkeletonCards() {
    return Array.from({ length: SKELETON_CARD_COUNT }, (_, itemIndex) => (
      <li className={styles.card} key={itemIndex}>
        <div className={styles.avatar} aria-hidden="true" />

        <div className={styles.textBlock}>
          <div className={styles.line} aria-hidden="true" />
          <div className={styles.lineShort} aria-hidden="true" />
        </div>
      </li>
    ));
  }

  render() {
    return (
      <div className={styles.loader}>
        <p className={styles.message}>{APP_MESSAGES.loader.message}</p>

        <ul className={styles.list} aria-label={APP_MESSAGES.loader.ariaLabel}>
          {this.renderSkeletonCards()}
        </ul>
      </div>
    );
  }
}

export default Loader;
