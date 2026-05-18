import { Link } from 'react-router';
import { APP_ROUTES } from '../../router/routes';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <main className={styles.shell}>
      <section className={styles.card}>
        <p className={styles.code}>404</p>

        <h1 className={styles.title}>Dimension not found</h1>

        <p className={styles.text}>
          The portal opened in the wrong timeline. Return to the explorer and
          scan a stable dimension.
        </p>

        <Link className={styles.link} to={APP_ROUTES.explorer}>
          Back to Explorer
        </Link>
      </section>
    </main>
  );
}

export default NotFoundPage;
