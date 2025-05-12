import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRetailer } from '../../redux/filters/filterSlice';
import { selectSelectedRetailer, selectUniqueRetailers} from '../../redux/filters/filterSelectors';
import styles from './ButtonsStyles/FilterButtons.module.scss';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const FilterRetailButton = () => {
  const dispatch = useDispatch();
  const selectedRetailers = useSelector(selectSelectedRetailer);
  const retailers = useSelector(selectUniqueRetailers);

  const [isOpen, setIsOpen] = useState(false);
  const [storedRetailers, setStoredRetailers] = useLocalStorage('selectedRetailers', []);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (storedRetailers.length > 0) {
      dispatch(setRetailer(storedRetailers));
    }
  }, [dispatch, storedRetailers]);

  useEffect(() => {
    setStoredRetailers(selectedRetailers);
  }, [selectedRetailers, setStoredRetailers]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (selectedRetailers.includes(value)) {
      dispatch(setRetailer(selectedRetailers.filter(r => r !== value)));
    } else {
      dispatch(setRetailer([...selectedRetailers, value]));
    }
  };

  const toggleDropdown = () => setIsOpen(prev => !prev);

  return (
    <div className={styles.filterContainer} ref={dropdownRef}>
      <button
        className={`${styles.filterButton} ${styles.dropdownFilterButton}`}
        onClick={toggleDropdown}
      >
        Retailer
      </button>

      {isOpen && (
        <div className={styles.dropdownList}>
          <div className={styles.checkboxContainer}>
            {retailers.map(retailer => (
              <div key={retailer} className={styles.checkboxItem}>
                <label className={styles.checkboxLabel}>
                  {retailer}
                  <input
                    type="checkbox"
                    value={retailer}
                    checked={selectedRetailers.includes(retailer)}
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

export default FilterRetailButton;
