// filterSelectors.js
import { createSelector } from '@reduxjs/toolkit';
import { selectAllBikes } from '../bikes/bikeSelectors';

export const selectBikes = (state) => state.bikes.list;
export const selectSelectedRetailer = (state) => state.filters.retailer;
export const selectSelectedCategories = (state) => state.filters.category;
export const selectSortByPrice = (state) => state.filters.sortByPrice;
export const selectOnlyNewest = (state) => state.filters.onlyNewest;

// filterSelectors.js

export const selectLocation = (state) => state.filters.location;

export const selectLocationFilteredBikes = createSelector(
  [selectBikes, selectLocation],
  (bikes, location) => {
    if (location) {
      // Тут можна додати логіку для фільтрації за відстанню від користувача, якщо є координати велосипедів
      // Наприклад, перевіряти, чи є координати у велосипедах і порівнювати їх
      return bikes.filter(bike => {
        // Якщо велосипед має координати, перевіряємо відстань
        if (bike.location) {
          const distance = getDistance(location, bike.location); // Функція для обчислення відстані між координатами
          return distance < 50; // Наприклад, велосипеди в межах 50 км від користувача
        }
        return false;
      });
    }
    return bikes;
  }
);

// Функція для обчислення відстані між координатами (широта, довгота) за допомогою Haversine формули
const getDistance = (loc1, loc2) => {
  const R = 6371; // Розмір Землі в км
  const lat1 = loc1.latitude;
  const lon1 = loc1.longitude;
  const lat2 = loc2.latitude;
  const lon2 = loc2.longitude;

  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Відстань в км

  return distance;
}

const deg2rad = (deg) => deg * (Math.PI / 180);

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
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    // Якщо фільтр увімкнено — відфільтровуємо нові
    const filteredBikes = onlyNewest
      ? bikes.filter(bike => new Date(bike.createdAt) >= twoWeeksAgo)
      : bikes;

    // Сортуємо всі (чи відфільтровані) — найновіші зверху
    return [...filteredBikes].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
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
    selectRetailerFilteredBikes,
    selectCategoryFilteredBikes,
    selectNewestSortedBikes,
    selectSortedByPriceBikes,
    selectLocationFilteredBikes
  ],
  (retailerFiltered, categoryFiltered, newestFiltered, priceSortedFiltered, locationFiltered) => {
    return locationFiltered
      .filter(bike =>
        retailerFiltered.includes(bike) &&
        categoryFiltered.includes(bike) &&
        newestFiltered.includes(bike) &&
        priceSortedFiltered.includes(bike)
      );
  }
);

