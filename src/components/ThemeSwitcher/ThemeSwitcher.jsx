import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './ThemeSwitcher.module.scss';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  const [isActive, setIsActive] = useState(theme === 'dark');

  useEffect(() => {
    setIsActive(theme === 'dark');
  }, [theme]);

  const handleClick = () => {
    toggleTheme();
  };

  return (
    <div className={styles['theme-switcher']}>
      <button
        onClick={handleClick}
        className={`${styles['theme-slider']} ${isActive ? styles.active : ''}`}
        aria-label="Toggle theme"
      >
        <span className={styles['slider-thumb']} />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
