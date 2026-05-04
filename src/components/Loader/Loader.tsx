import { Component } from 'react';
import { APP_MESSAGES } from '../../constants/messages';
import styles from './Loader.module.css';

const SKELETON_ITEMS = [1, 2, 3, 4, 5];

class Loader extends Component {
  render() {
    return (
      <div className={styles.loader}>
        <p className={styles.message}>{APP_MESSAGES.loader.message}</p>

        <ul className={styles.list} aria-label={APP_MESSAGES.loader.ariaLabel}>
          {SKELETON_ITEMS.map((itemId) => (
            <li className={styles.card} key={itemId}>
              <div className={styles.avatar} aria-hidden="true" />

              <div className={styles.textBlock}>
                <div className={styles.line} aria-hidden="true" />
                <div className={styles.lineShort} aria-hidden="true" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Loader;
