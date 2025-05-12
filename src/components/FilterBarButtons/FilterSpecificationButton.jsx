import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../redux/filters/filterSlice';
import { selectSelectedCategories, selectUniqueCategories } from '../../redux/filters/filterSelectors';
import styles from './ButtonsStyles/FilterButtons.module.scss';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const FilterSpecificationButton = () => {
  const dispatch = useDispatch();
  const selectedCategories = useSelector(selectSelectedCategories);
  const categories = useSelector(selectUniqueCategories);

  const [isOpen, setIsOpen] = useState(false);
  const [storedCategories, setStoredCategories] = useLocalStorage('selectedCategories', []);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (storedCategories.length > 0) {
      dispatch(setCategory(storedCategories));
    }
  }, [dispatch, storedCategories]);

  useEffect(() => {
    setStoredCategories(selectedCategories);
  }, [selectedCategories, setStoredCategories]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (e) => {
    const category = e.target.value;
    if (selectedCategories.includes(category)) {
      dispatch(setCategory(selectedCategories.filter(c => c !== category)));
    } else {
      dispatch(setCategory([...selectedCategories, category]));
    }
  };

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const isActive = selectedCategories.length > 0;

  return (
    <div className={styles.filterContainer} ref={dropdownRef}>
      <button
        className={`${styles.filterButton} ${isActive ? styles['filterButton--active'] : ''}`}
        onClick={toggleDropdown}
      >
        Specification
      </button>

      {isOpen && (
        <div className={styles.dropdownList}>
          <div className={styles.checkboxContainer}>
            {categories.map(category => (
              <div key={category} className={styles.checkboxItem}>
                <label className={styles.checkboxLabel}>
                  {category}
                  <input
                    type="checkbox"
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={handleCheckboxChange}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSpecificationButton;
