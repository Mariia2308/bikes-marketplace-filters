import React from 'react';
import { useDispatch } from 'react-redux';
import { resetFilters } from '../../redux/filters/filterSlice';

import FilterLocationButton from '../FilterBarButtons/FilterLocationButton';
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
      <FilterRetailButton />
      <FilterSpecificationButton />
      <FilterLocationButton />
      <FilterPriceButton />
      <FilterNewestButton />

      <button onClick={handleReset} className={styles.resetButton}>
        Reset Filters
      </button>
    </div>
  );
};

export default FilterBar;
