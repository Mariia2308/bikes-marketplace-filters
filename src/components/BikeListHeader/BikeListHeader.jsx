import React from 'react';
import styles from '../Pagination/Pagination.module.scss';

const BikeListHeader = ({itemsPerPage, setItemsPerPage }) => {
  return (
    <div className={styles.headerWrapper}>
      


      <div className={styles.resultsPerPage}>
        <label>Results per page</label>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          {[5, 10, 15].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BikeListHeader;
