import { useId } from 'react';
import { Link } from 'react-router';
import { APP_MESSAGES } from '../../constants/messages';
import { APP_ROUTES } from '../../router/routes';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  const titleId = useId();

  return (
    <main className={styles.shell}>
      <section className={styles.panel} aria-labelledby={titleId}>
        <div className={styles.copy}>
          <p className={styles.kicker}>{APP_MESSAGES.notFoundPage.kicker}</p>

          <p className={styles.code}>{APP_MESSAGES.notFoundPage.code}</p>

          <h1 className={styles.title} id={titleId}>
            {APP_MESSAGES.notFoundPage.title}
          </h1>

          <p className={styles.text}>{APP_MESSAGES.notFoundPage.description}</p>

          <Link className={styles.link} to={APP_ROUTES.explorer}>
            {APP_MESSAGES.notFoundPage.backLink}
          </Link>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.portalFrame}>
            <div className={styles.portalOrb}>
              <div className={styles.portalCore} />
            </div>

            <div className={styles.signalLine} />
            <div className={styles.signalLineShort} />
            <div className={styles.signalLineBroken} />
          </div>

          <p className={styles.visualLabel}>
            {APP_MESSAGES.notFoundPage.visualLabel}
          </p>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;
