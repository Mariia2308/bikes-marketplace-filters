import { configureStore } from '@reduxjs/toolkit';
import bikeReducer from './bikes/bikeSlice';
import filtersReducer from './filters/filterSlice';
import priceSliderReducer from './slider/sliderSlice';
export const store = configureStore({
  reducer: {
    bikes: bikeReducer,
    filters: filtersReducer,
    priceSlider: priceSliderReducer,
  },
});
