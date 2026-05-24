import { APP_MESSAGES } from '../../constants/messages';
import { APP_THEME } from '../../theme/themeTypes';
import type { AppTheme } from '../../theme/themeTypes';
import { useTheme } from '../../theme/useTheme';
import styles from './ThemeSwitcher.module.css';

function getToggleAriaLabel(theme: AppTheme): string {
  if (theme === APP_THEME.dark) {
    return APP_MESSAGES.theme.switchToLightDimension;
  }

  return APP_MESSAGES.theme.switchToDarkDimension;
}

function getSwitcherClassName(theme: AppTheme): string {
  if (theme === APP_THEME.dark) {
    return `${styles.switcher} ${styles.dark}`;
  }

  return `${styles.switcher} ${styles.light}`;
}

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  const toggleAriaLabel = getToggleAriaLabel(theme);
  const switcherClassName = getSwitcherClassName(theme);

  return (
    <button
      className={switcherClassName}
      type="button"
      aria-label={toggleAriaLabel}
      title={toggleAriaLabel}
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
