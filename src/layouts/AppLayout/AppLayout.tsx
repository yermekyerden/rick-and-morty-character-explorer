import { NavLink, Outlet } from 'react-router';
import ThemeSwitcher from '../../components/ThemeSwitcher/ThemeSwitcher';
import { APP_ROUTES } from '../../router/routes';
import styles from './AppLayout.module.css';

function AppLayout() {
  return (
    <div className={styles.shell}>
      <header className={styles.topBar}>
        <NavLink className={styles.brand} to={APP_ROUTES.explorer}>
          Portal Lab
        </NavLink>

        <nav className={styles.navigation} aria-label="Main navigation">
          <NavLink className={styles.link} to={APP_ROUTES.explorer}>
            Explorer
          </NavLink>

          <NavLink className={styles.link} to={APP_ROUTES.about}>
            About
          </NavLink>
        </nav>

        <div className={styles.themeSlot}>
          <ThemeSwitcher />
        </div>
      </header>

      <Outlet />
    </div>
  );
}

export default AppLayout;
