import { createSelector } from '@reduxjs/toolkit';
import { selectAllBikes } from '../bikes/bikeSelectors';  // Це має бути селектор для всіх велосипедів

export const selectPriceRange = (state) => state.priceSlider.priceRange;
// Ось селектор для фільтрації велосипедів за ціною
export const selectPriceFilteredBikes = createSelector(
  [selectAllBikes, selectPriceRange], // selectAllBikes повинен бути правильно визначений у bikeSelectors
  (bikes, priceRange) => {
    const [minPrice, maxPrice] = priceRange;
    return bikes.filter(bike => bike.price >= minPrice && bike.price <= maxPrice);  // Фільтрація за ціною
  }
);
