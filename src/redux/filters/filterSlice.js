import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  location: {
    country: '',
    city: '',
  },
  countries: [],
  cities: [],
  retailer: [],
  category: [],
  onlyNewest: false,
  sortByPrice: false,
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
      state.sortByPrice = action.payload;
    },
    setSortByNewest: (state) => {
      state.onlyNewest = !state.onlyNewest;
    },
    setSortByNewestValue: (state, action) => {
      state.onlyNewest = action.payload;
    },
    
    resetFilters: () => initialState,
  },
});

export const {
  setLocation,
  setRetailer,
  setCategory,
  setSortByNewestValue,
  setSortByPrice,
  setSortByNewest,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
