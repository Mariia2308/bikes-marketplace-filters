import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortByPrice } from '../../redux/filters/filterSlice';
import { selectSortByPrice } from '../../redux/filters/filterSelectors';

const FilterPriceButton = () => {
  const dispatch = useDispatch();
  const sortByPrice = useSelector(selectSortByPrice);  // Статус фільтрації по ціні

  const handleClick = () => {
    dispatch(setSortByPrice(!sortByPrice));  // Перемикає фільтрацію по ціні
  };

  return (
    <div>
      <button onClick={handleClick}>
        Price
      </button>
    </div>
  );
};

export default FilterPriceButton;
