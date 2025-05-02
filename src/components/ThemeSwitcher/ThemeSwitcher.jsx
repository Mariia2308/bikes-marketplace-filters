// src/components/ThemeSwitcher/ThemeSwitcher.js
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './ThemeSwitcher.module.scss'; // ← правильний імпорт SCSS-модуля

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles['theme-switcher']}>
      <button onClick={toggleTheme}>
        Змінити тему ({theme === 'light' ? 'Світла' : 'Темна'})
      </button>
    </div>
  );
};

export default ThemeSwitcher;
