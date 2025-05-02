// FilterNewestButton.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortByNewest } from '../../redux/filters/filterSlice';
import { selectOnlyNewest } from '../../redux/filters/filterSelectors';

const FilterNewestButton = () => {
  const dispatch = useDispatch();
  const onlyNewest = useSelector(selectOnlyNewest); // Статус фільтрації по новизні
  
  const handleClick = () => {
    dispatch(setSortByNewest()); // Перемикає фільтрацію по новизні
  };
  
  return (
    <button onClick={handleClick}>
      {onlyNewest ? 'Показати всі' : 'Показати нові'}
    </button>
  );
};

export default FilterNewestButton;
