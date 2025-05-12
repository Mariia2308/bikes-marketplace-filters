import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredBikes } from '../../redux/filters/filterSelectors';
import BikeCard from '../BikeCard/BikeCard';
import { usePagination } from '../../hooks/usePagination';
import BikeListControls from '../BikeListControls/BikeListControls';
import FilterResetButton from '../FilterBarButtons/FilterResetButton';
import styles from './BikesList.module.scss';

const BikesList = () => {
  const bikes = useSelector(selectFilteredBikes);

  const {
    paginatedItems,
    currentPage,
    itemsPerPage,
    totalPages,
    setItemsPerPage,
    setCurrentPage,
    nextPage,
    prevPage,
    hasNext,
    hasPrev,
  } = usePagination(bikes);

  if (!bikes || bikes.length === 0) {
    return (
      <div className={styles.noResultsWrapper}>
        <p>No available bikes by chosen filters</p>
        <FilterResetButton />
      </div>
    );
  }

  return (
    <div className={styles.bikesListWrapper}>
      <p className={styles.bikesFoundText}>{bikes.length} bikes found</p>

      <BikeListControls
        bikes={bikes}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
        setCurrentPage={setCurrentPage}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />

      {paginatedItems.map((bike) => (
        <BikeCard key={bike.id} bike={bike} />
      ))}
    </div>
  );
};

export default BikesList;
