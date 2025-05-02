import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
  setLocation,
  setRetailer,
  setCategory,
  setSortByPrice,
  setSortByNewest,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
