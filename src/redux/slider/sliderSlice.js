import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  priceRange: [1, 5000], // Початковий діапазон
};

const priceSliderSlice = createSlice({
  name: 'priceSlider',
  initialState,
  reducers: {
    setPriceRange: (state, action) => {
      state.priceRange = action.payload; // Оновлюємо priceRange
    },
  },
});

// Додаємо селектор для отримання діапазону цін
export const selectPriceRange = (state) => state.priceSlider.priceRange;

export const { setPriceRange } = priceSliderSlice.actions;
export default priceSliderSlice.reducer;
