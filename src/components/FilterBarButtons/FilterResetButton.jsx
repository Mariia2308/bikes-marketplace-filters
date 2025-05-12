import React from 'react';
import { useDispatch } from 'react-redux';
import { resetFilters, setLocation } from '../../redux/filters/filterSlice';
import { resetFilterLocalStorage } from '../../hooks/resetFilterStorage';
import styles from './ButtonsStyles/FilterButtons.module.scss';
import { setPriceRange } from '../../redux/slider/sliderSlice';

function FilterResetButton() {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetFilters());
    dispatch(setLocation({ country: '', city: '' }));
    dispatch(setPriceRange([600, 5000]));
    resetFilterLocalStorage();

  };

  return (
    <button onClick={handleReset} className={styles.resetButton} title="Reset filters">
      <svg viewBox="0 0 24 24">
        <path d="M12 5V1L8 5l4 4V6c3.31 0 6 2.69 6 6a6 6 0 0 1-6 6 6 6 0 0 1-5.66-4H4.26a8 8 0 0 0 7.74 6c4.42 0 8-3.58 8-8s-3.58-8-8-8z" />
      </svg>
    </button>
  );
}

export default FilterResetButton;
