import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSortByNewestValue } from '../../redux/filters/filterSlice';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import styles from './ButtonsStyles/FilterButtons.module.scss';

const FilterNewestButton = () => {
  const dispatch = useDispatch();
  const [onlyNewest, setOnlyNewest] = useLocalStorage('onlyNewest', false);

  const handleClick = () => {
    const newValue = !onlyNewest;
    setOnlyNewest(newValue);
    dispatch(setSortByNewestValue(newValue));
  };

  useEffect(() => {
    dispatch(setSortByNewestValue(onlyNewest));
  }, [dispatch, onlyNewest]);

  return (
    <button
      className={`${styles.filterButton} ${onlyNewest ? styles['filterButton--active'] : ''}`}
      onClick={handleClick}
    >
      Newest
    </button>
  );
};

export default FilterNewestButton;
