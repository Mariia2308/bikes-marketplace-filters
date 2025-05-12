import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  priceRange: [600, 5000], 
};

const priceSliderSlice = createSlice({
  name: 'priceSlider',
  initialState,
  reducers: {
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
  },
});




export const { setPriceRange } = priceSliderSlice.actions;
export default priceSliderSlice.reducer;
