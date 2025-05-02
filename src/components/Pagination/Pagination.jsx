import React from 'react';

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
    <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      <button onClick={() => setCurrentPage(1)} disabled={!hasPrev}>⏮️ Початок</button>
      <button onClick={prevPage} disabled={!hasPrev}>← Попередня</button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          style={{
            fontWeight: currentPage === i + 1 ? 'bold' : 'normal'
          }}
        >
          {i + 1}
        </button>
      ))}

      <button onClick={nextPage} disabled={!hasNext}>Наступна →</button>
      <button onClick={() => setCurrentPage(totalPages)} disabled={!hasNext}>Кінець ⏭️</button>
    </div>
  );
};

export default Pagination;
