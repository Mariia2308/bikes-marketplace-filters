// FilterNewestButton.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSortByNewest } from '../../redux/filters/filterSlice';

const FilterNewestButton = () => {
  const dispatch = useDispatch();

  
  const handleClick = () => {
    dispatch(setSortByNewest()); // Перемикає фільтрацію по новизні
  };
  
  return (
    <button onClick={handleClick}>
        Newest
    </button>
  );
};

export default FilterNewestButton;
