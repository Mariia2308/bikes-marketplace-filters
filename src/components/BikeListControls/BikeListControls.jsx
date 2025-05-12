import React from 'react';
import BikeListHeader from '../BikeListHeader/BikeListHeader';
import Pagination from '../Pagination/Pagination';
import styles from './BikeListControls.module.scss';
import FilterBar from '../FilterBar/FilterBar';

const BikeListControls = ({
  bikes,
  itemsPerPage,
  setItemsPerPage,
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  setCurrentPage,
  hasNext,
  hasPrev,
}) => {
  return (
    <div className={styles.controlsWrapper}>
      <FilterBar />

      <div className={styles.paginationControls}>
        <div className={styles.paginationWrapper}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            nextPage={nextPage}
            prevPage={prevPage}
            setCurrentPage={setCurrentPage}
            hasNext={hasNext}
            hasPrev={hasPrev}
          />
        </div>

        <BikeListHeader
          bikes={bikes}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      </div>
    </div>
  );
};

export default BikeListControls;
