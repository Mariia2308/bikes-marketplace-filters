import { createSelector } from '@reduxjs/toolkit';
import { selectAllBikes } from '../bikes/bikeSelectors';  

export const selectPriceRange = (state) => state.priceSlider.priceRange;

export const selectPriceFilteredBikes = createSelector(
  [selectAllBikes, selectPriceRange], 
  (bikes, priceRange) => {
    const [minPrice, maxPrice] = priceRange;
    return bikes.filter(bike => bike.price >= minPrice && bike.price <= maxPrice);  
  }
);
