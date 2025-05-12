import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortByPrice } from '../../redux/filters/filterSlice';
import { selectSortByPrice } from '../../redux/filters/filterSelectors';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import styles from './ButtonsStyles/FilterButtons.module.scss';

const FilterPriceButton = () => {
  const dispatch = useDispatch();
  const sortByPrice = useSelector(selectSortByPrice);
  const [sortByPriceLS, setSortByPriceLS] = useLocalStorage('sortByPrice', false);
  const didInit = useRef(false);

  useEffect(() => {
    if (!didInit.current) {
      dispatch(setSortByPrice(sortByPriceLS));
      didInit.current = true;
    }
  }, [dispatch, sortByPriceLS]);

  useEffect(() => {
    if (didInit.current) {
      setSortByPriceLS(sortByPrice);
    }
  }, [sortByPrice]);

  const handleClick = () => {
    dispatch(setSortByPrice(!sortByPrice));
  };

  return (
    <button
      className={`${styles.filterButton} ${sortByPrice ? styles['filterButton--active'] : ''}`}
      onClick={handleClick}
    >
      Price
    </button>
  );
};

export default FilterPriceButton;
