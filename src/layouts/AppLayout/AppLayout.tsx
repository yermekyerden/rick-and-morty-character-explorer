import { NavLink, Outlet } from 'react-router';
import ThemeSwitcher from '../../components/ThemeSwitcher/ThemeSwitcher';
import { APP_MESSAGES } from '../../constants/messages';
import { APP_ROUTES } from '../../router/routes';
import styles from './AppLayout.module.css';

interface NavigationLinkClassNameOptions {
  isActive: boolean;
}

function createNavigationLinkClassName({
  isActive,
}: NavigationLinkClassNameOptions): string {
  const classNames = [styles.link];

  if (isActive) {
    classNames.push(styles.activeLink);
  }

  return classNames.join(' ');
}

function AppLayout() {
  return (
    <div className={styles.shell}>
      <header className={styles.topBar}>
        <div className={styles.topBarInner}>
          <NavLink className={styles.brand} to={APP_ROUTES.explorer}>
            {APP_MESSAGES.layout.brand}
          </NavLink>

          <nav
            className={styles.navigation}
            aria-label={APP_MESSAGES.layout.mainNavigationLabel}
          >
            <NavLink
              end
              className={createNavigationLinkClassName}
              to={APP_ROUTES.explorer}
            >
              {APP_MESSAGES.layout.explorerLink}
            </NavLink>

            <NavLink
              className={createNavigationLinkClassName}
              to={APP_ROUTES.about}
            >
              {APP_MESSAGES.layout.aboutLink}
            </NavLink>
          </nav>

          <div className={styles.themeSlot}>
            <span className={styles.themeLabel}>
              {APP_MESSAGES.theme.label}
            </span>

            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  );
}

export default AppLayout;
