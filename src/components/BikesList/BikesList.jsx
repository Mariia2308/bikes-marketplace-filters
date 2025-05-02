import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBikes } from '../../redux/bikes/bikeSlice';
import { selectFilteredBikes } from '../../redux/filters/filterSelectors';
import BikeCard from '../BikeCard/BikeCard';
import { usePagination } from '../../hooks/usePagination';
import Pagination from '../Pagination/Pagination';
import FilterBar from '../FilterBar/FilterBar';

const BikesList = () => {
  const dispatch = useDispatch();
  const bikes = useSelector(selectFilteredBikes); // Використовуємо комбінований фільтр
  const loading = useSelector(state => state.bikes.loading); // Статус завантаження

  useEffect(() => {
    dispatch(fetchBikes()); // Завантажуємо байки при монтуванні компонента
  }, [dispatch]);

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

  if (loading) return <p>Loading...</p>;
  if (!bikes || bikes.length === 0) return <p>Немає доступних велосипедів.</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{bikes.length} bikes found</h2>
        <div>
          <label>На сторінці: </label>
          <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
            {[5, 10, 15].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
      </div>

      <FilterBar />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
        setCurrentPage={setCurrentPage}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />

      {paginatedItems.map(bike => (
        <BikeCard key={bike.id} bike={bike} />
      ))}
    </div>
  );
};

export default BikesList;
