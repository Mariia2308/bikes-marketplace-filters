// filterSelectors.js
import { createSelector } from '@reduxjs/toolkit';
import { selectAllBikes } from '../bikes/bikeSelectors';
import { selectPriceFilteredBikes } from '../slider/sliderSelectors'; 

// Імпортуємо селектор для фільтрації за ціною
export const selectBikes = (state) => state.bikes.list;

export const selectSelectedRetailer = (state) => state.filters.retailer;
export const selectSelectedCategories = (state) => state.filters.category;
export const selectLocation = (state) => state.filters.location;
export const selectSortByPrice = (state) => state.filters.sortByPrice;
export const selectOnlyNewest = (state) => state.filters.onlyNewest;// Це для фільтрації по новизні?

// Унікальні категорії
export const selectUniqueCategories = createSelector(
  [selectAllBikes],
  (bikes) => [...new Set(bikes.map(b => b.category))].filter(Boolean)
);

// Унікальні рітейлери
export const selectUniqueRetailers = createSelector(
  [selectAllBikes],
  (bikes) => [...new Set(bikes.map(b => b.retailer))].filter(Boolean)
);

// Фільтрація за рітейлером
export const selectRetailerFilteredBikes = createSelector(
  [selectBikes, selectSelectedRetailer],
  (bikes, selectedRetailers) => {
    if (selectedRetailers.length > 0) {
      return bikes.filter(bike => selectedRetailers.includes(bike.retailer));
    }
    return bikes;
  }
);

// Фільтрація за категорією
export const selectCategoryFilteredBikes = createSelector(
  [selectBikes, selectSelectedCategories],
  (bikes, selectedCategories) => {
    if (selectedCategories.length > 0) {
      return bikes.filter(bike => selectedCategories.includes(bike.category));
    }
    return bikes;
  }
);

// Фільтрація за новизною (по даті)
export const selectNewestSortedBikes = createSelector(
  [selectBikes, selectOnlyNewest],
  (bikes, onlyNewest) => {
    if (onlyNewest) {
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14); // Віднімаємо два тижні

      // Фільтруємо велосипеди, які були додані за останні два тижні
      return bikes.filter(bike => {
        const bikeDate = new Date(bike.createdAt);
        return bikeDate >= twoWeeksAgo;
      });
    }
    return bikes;
  }
);

// Сортування за ціною (по зростанню)
export const selectSortedByPriceBikes = createSelector(
  [selectBikes, selectSortByPrice],
  (bikes, sortByPrice) => {
    const sortedBikes = [...bikes];
    return sortedBikes.sort((a, b) => sortByPrice ? a.price - b.price : b.price - a.price);
  }
);

// Комбінована фільтрація
export const selectFilteredBikes = createSelector(
  [
    selectPriceFilteredBikes, // Ціна
    selectRetailerFilteredBikes, // Рітейлер
    selectCategoryFilteredBikes, // Категорія
    selectNewestSortedBikes, // Новизна
    selectSortedByPriceBikes // Сортування по ціні
  ],
  (priceFiltered, retailerFiltered, categoryFiltered, newestFiltered, sortedByPrice) => {
    return sortedByPrice
      .filter(bike =>
        priceFiltered.includes(bike) &&
        retailerFiltered.includes(bike) &&
        categoryFiltered.includes(bike) &&
        newestFiltered.includes(bike)
      );
  }
);
