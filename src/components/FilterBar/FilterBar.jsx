import React from 'react';
import { useDispatch } from 'react-redux';
import { resetFilters } from '../../redux/filters/filterSlice';
import FilterPriceButton from '../FilterBarButtons/FilterPriceButton';
import FilterNewestButton from '../FilterBarButtons/FilterNewestButton';
import FilterRetailButton from '../FilterBarButtons/FilterRetailButton';
import FilterSpecificationButton from '../FilterBarButtons/FilterSpecificationButton';

import styles from './FilterBar.module.scss';

const FilterBar = () => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className={styles.filterBar}>
      <FilterPriceButton />
      <FilterNewestButton />
      <FilterRetailButton />
      <FilterSpecificationButton />

      <a onClick={handleReset} className={styles.resetButton}>
        Reset Filters
      </a>


    </div>
  );
};

export default FilterBar;
