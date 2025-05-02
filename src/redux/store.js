import { configureStore } from '@reduxjs/toolkit';
import bikeReducer from './bikes/bikeSlice';
import filtersReducer from './filters/filterSlice';

export const store = configureStore({
  reducer: {
    bikes: bikeReducer,
    filters: filtersReducer,
  },
});
