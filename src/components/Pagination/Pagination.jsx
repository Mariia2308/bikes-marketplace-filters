import React from 'react';
import styles from './Pagination.module.scss';
import clsx from 'clsx';

const Pagination = ({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  setCurrentPage,
  hasNext,
  hasPrev
}) => {
  return (
    <div className={styles.pagination}>
      <button className={styles.pageButton} onClick={() => setCurrentPage(1)} disabled={!hasPrev}>First</button>
      <button className={styles.pageButton} onClick={prevPage} disabled={!hasPrev}>Prev</button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          className={clsx(styles.pageButton, currentPage === i + 1 && styles['pageButton--active'])}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button className={styles.pageButton} onClick={nextPage} disabled={!hasNext}>Next</button>
      <button className={styles.pageButton} onClick={() => setCurrentPage(totalPages)} disabled={!hasNext}>Last</button>
    </div>
  );
};

export default Pagination;
