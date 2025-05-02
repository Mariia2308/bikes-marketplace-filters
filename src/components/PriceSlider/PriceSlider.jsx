import React, { useEffect } from 'react';
import { Box, Slider, TextField, Typography, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setPriceRange } from '../../redux/slider/sliderSlice';
import { selectPriceRange } from '../../redux/slider/sliderSelectors';

const histogramData = [3, 6, 10, 8, 12, 9, 5, 4, 12, 1, 6, 10, 8, 12, 9, 5, 4, 12, 6, 10, 8, 12, 9, 5, 4, 12, 6, 10, 8, 12, 9, 5, 4, 2]; // Примерні дані для гістограми
const minPrice = 1;
const maxPrice = 5600;

export default function PriceSlider() {
  const dispatch = useDispatch();
  const range = useSelector(selectPriceRange);
  useEffect(() => {
    dispatch(setPriceRange(range)); // Встановлюємо початковий діапазон
  }, [dispatch, range]);

  const handleSliderChange = (event, newValue) => {
    dispatch(setPriceRange(newValue)); // Оновлюємо діапазон у Redux
  };

  const handleInputChange = (index) => (event) => {
    const newVal = Number(event.target.value);
    const newRange = [...range];
    newRange[index] = newVal;
    dispatch(setPriceRange([
      Math.max(minPrice, Math.min(newRange[0], newRange[1])),
      Math.min(maxPrice, Math.max(newRange[0], newRange[1])),
    ])); // Оновлюємо діапазон у Redux
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Typography variant="h6">Price Range</Typography>

      {/* Гістограма */}
      <Box sx={{ display: 'flex', alignItems: 'flex-end', height: 80, mb: 2 }}>
        {histogramData.map((value, index) => (
          <Box
            key={index}
            sx={{
              flex: 1,
              mx: 0.25,
              height: `${value * 5}px`,
              backgroundColor:
                (index / histogramData.length) * (maxPrice - minPrice) + minPrice >= range[0] &&
                (index / histogramData.length) * (maxPrice - minPrice) + minPrice <= range[1]
                  ? 'primary.main'
                  : 'grey.300',
              borderRadius: 1,
            }}
          />
        ))}
      </Box>

      {/* Слайдер */}
      <Slider
        value={range}
        min={minPrice}
        max={maxPrice}
        step={1}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
      />

      {/* Ввід вручну */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <TextField
            label="Min Price"
            type="number"
            value={range[0]}
            onChange={handleInputChange(0)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Max Price"
            type="number"
            value={range[1]}
            onChange={handleInputChange(1)}
            fullWidth
          />
        </Grid>
      </Grid>

    </Box>
  );
}
