import { createSelector } from '@reduxjs/toolkit';
import { selectAllBikes } from '../bikes/bikeSelectors';
import { selectPriceFilteredBikes } from '../slider/sliderSelectors';

export const selectBikes = (state) => state.bikes.list;
export const selectSelectedRetailer = (state) => state.filters.retailer;
export const selectSelectedCategories = (state) => state.filters.category;
export const selectLocation = (state) => state.filters.location;
export const selectSortByPrice = (state) => state.filters.sortByPrice;
export const selectOnlyNewest = (state) => state.filters.onlyNewest;
export const selectCountries = (state) => state.filters.countries;
export const selectCities = (state) => state.filters.cities;
export const selectSelectedCountry = (state) => state.filters.location?.country || null;
export const selectUniqueCategories = createSelector(
  [selectAllBikes],
  (bikes) => [...new Set(bikes.map(b => b.category))].filter(Boolean)
);


export const selectUniqueRetailers = createSelector(
  [selectAllBikes],
  (bikes) => [...new Set(bikes.map(b => b.retailer))].filter(Boolean)
);


export const selectUniqueCountries = createSelector(
  [selectAllBikes],
  (bikes) =>
    Array.from(new Set(bikes.map(bike => bike.location?.country).filter(Boolean)))
      .sort((a, b) => a.localeCompare(b))
);

export const selectUniqueCities = createSelector(
  [selectAllBikes, selectSelectedCountry],
  (bikes, selectedCountry) => {
    if (!selectedCountry) return [];

    return Array.from(
      new Set(
        bikes
          .filter(bike => bike.location?.country === selectedCountry)
          .map(bike => bike.location?.city)
          .filter(Boolean)
      )
    ).sort((a, b) => a.localeCompare(b));
  }
);

export const selectRetailerFilteredBikes = createSelector(
  [selectBikes, selectSelectedRetailer],
  (bikes, selectedRetailers) =>
    selectedRetailers.length > 0
      ? bikes.filter(bike => selectedRetailers.includes(bike.retailer))
      : bikes
);

export const selectCategoryFilteredBikes = createSelector(
  [selectBikes, selectSelectedCategories],
  (bikes, selectedCategories) =>
    selectedCategories.length > 0
      ? bikes.filter(bike => selectedCategories.includes(bike.category))
      : bikes
);

export const selectNewestSortedBikes = createSelector(
  [selectBikes, selectOnlyNewest],
  (bikes, onlyNewest) => {
    const sortedBikes = [...bikes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    if (onlyNewest) {
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
      return sortedBikes.filter(bike => new Date(bike.createdAt) >= twoWeeksAgo);
    }

    return sortedBikes;
  }
);



export const selectSortedByPriceBikes = createSelector(
  [selectBikes, selectSortByPrice],
  (bikes, sortByPrice) => {
    const sorted = [...bikes];
    return sortByPrice ? sorted.sort((a, b) => a.price - b.price) : sorted.sort((a, b) => b.price - a.price);
  }
);


export const selectLocationFilteredBikes = createSelector(
  [selectBikes, selectLocation],
  (bikes, location) => {
    if (!location?.country && !location?.city) return bikes;

    return bikes.filter((bike) => {
      const matchesCountry = location.country ? bike.location?.country === location.country : true;
      const matchesCity = location.city ? bike.location?.city === location.city : true;
      return matchesCountry && matchesCity;
    });
  }
);


export const selectFilteredBikes = createSelector(
  [
    selectPriceFilteredBikes,
    selectRetailerFilteredBikes,
    selectCategoryFilteredBikes,
    selectNewestSortedBikes,
    selectSortedByPriceBikes,
    selectLocationFilteredBikes,
  ],
  (priceFiltered, retailerFiltered, categoryFiltered, newestFiltered, sortedByPrice, locationFiltered) => {
    return sortedByPrice.filter(bike =>
      priceFiltered.includes(bike) &&
      retailerFiltered.includes(bike) &&
      categoryFiltered.includes(bike) &&
      newestFiltered.includes(bike) &&
      locationFiltered.includes(bike)
    );
  }
);
