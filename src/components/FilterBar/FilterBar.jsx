import React from 'react';
import FilterPriceButton from '../FilterBarButtons/FilterPriceButton';
import FilterNewestButton from '../FilterBarButtons/FilterNewestButton';
import FilterRetailButton from '../FilterBarButtons/FilterRetailButton';
import FilterSpecificationButton from '../FilterBarButtons/FilterSpecificationButton';
import FilterLocationButton from '../FilterBarButtons/FilterLocationButton';
import FilterResetButton from '../FilterBarButtons/FilterResetButton';
import styles from './FilterBar.module.scss';

const FilterBar = () => {
  return (
<div className={styles.filterBar}>
  <div className={styles.labelWrapper}>
    <span>Order by</span>
  </div>
  <div className={styles.buttonGroup}>
    <FilterPriceButton />
    <FilterNewestButton />
    <FilterLocationButton />
    <FilterRetailButton />
    <FilterSpecificationButton />
    <FilterResetButton /> 
  </div>
</div>

  );
};

export default FilterBar;
