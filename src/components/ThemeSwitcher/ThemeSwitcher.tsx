import { APP_MESSAGES } from '../../constants/messages';
import { APP_THEME } from '../../theme/themeTypes';
import type { AppTheme } from '../../theme/themeTypes';
import { useTheme } from '../../theme/useTheme';
import styles from './ThemeSwitcher.module.css';

function getThemeToggleLabel(theme: AppTheme): string {
  if (theme === APP_THEME.dark) {
    return APP_MESSAGES.theme.switchToLightDimension;
  }

  return APP_MESSAGES.theme.switchToDarkDimension;
}

function createSwitcherClassName(theme: AppTheme): string {
  if (theme === APP_THEME.dark) {
    return `${styles.switcher} ${styles.dark}`;
  }

  return `${styles.switcher} ${styles.light}`;
}

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  const themeToggleLabel = getThemeToggleLabel(theme);
  const switcherClassName = createSwitcherClassName(theme);

  return (
    <button
      className={switcherClassName}
      type="button"
      aria-label={themeToggleLabel}
      title={themeToggleLabel}
      onClick={toggleTheme}
    >
      <span className={styles.controlPanel} aria-hidden="true">
        <span className={`${styles.slot} ${styles.leftSlot}`} />
        <span className={`${styles.slot} ${styles.rightSlot}`} />

        <span className={`${styles.stem} ${styles.leftStem}`} />
        <span className={`${styles.stem} ${styles.rightStem}`} />

        <span className={styles.handleBar} />
      </span>
    </button>
  );
}

export default ThemeSwitcher;
