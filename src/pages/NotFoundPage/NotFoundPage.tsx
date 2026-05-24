import { Link } from 'react-router';
import { APP_ROUTES } from '../../router/routes';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <main className={styles.shell}>
      <section className={styles.panel} aria-labelledby="not-found-title">
        <div className={styles.copy}>
          <p className={styles.kicker}>Portal route failure</p>

          <p className={styles.code}>404</p>

          <h1 className={styles.title} id="not-found-title">
            Dimension not found
          </h1>

          <p className={styles.text}>
            The portal opened in the wrong timeline. Return to the explorer and
            scan a stable dimension.
          </p>

          <Link className={styles.link} to={APP_ROUTES.explorer}>
            Back to Explorer
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

          <p className={styles.visualLabel}>Timeline signal lost</p>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;
