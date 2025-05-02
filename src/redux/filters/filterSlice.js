// filterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  priceRange: [60, 5000],
  location: null,
  retailer: [],
  category: [],
  onlyNewest: false,
  sortByPrice: false, // Це властивість для сортування по ціні
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setRetailer: (state, action) => {
      state.retailer = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSortByPrice: (state, action) => {
      state.sortByPrice = action.payload; // Це має перемикати стан
    },
    setSortByNewest: (state) => {
      state.onlyNewest = !state.onlyNewest;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setPriceRange,
  setLocation,
  setRetailer,
  setCategory,
  setSortByPrice,
  setSortByNewest,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
