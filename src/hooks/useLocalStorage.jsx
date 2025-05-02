import { useState } from 'react';

export const useLocalStorage = (key, defaultValue) => {
  const getValue = () => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : defaultValue;
    } catch (error) {
      console.warn(`Помилка при читанні localStorage ключа "${key}"`, error);
      return defaultValue;
    }
  };

  const [value, setValue] = useState(getValue);

  const updateValue = (newValue) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Помилка при записі в localStorage ключа "${key}"`, error);
    }
  };

  return [value, updateValue];
};
