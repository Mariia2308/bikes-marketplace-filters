import React, { useState } from 'react';
import { Box, Slider, TextField, Typography, Grid } from '@mui/material';

const histogramData = [3, 6, 10, 8, 12, 9, 5, 4, 12, 1, 6, 10, 8, 12, 9, 5, 4, 12, 6, 10, 8, 12, 9, 5, 4, 12, 6, 10, 8, 12, 9, 5, 4, 2]; // Примерные данные для гистограммы
const minPrice = 60;
const maxPrice = 5600;

export default function PriceSlider() {
  const [range, setRange] = useState([minPrice, maxPrice]);

  const handleSliderChange = (event, newValue) => {
    setRange(newValue);
  };

  const handleInputChange = (index) => (event) => {
    const newVal = Number(event.target.value);
    const newRange = [...range];
    newRange[index] = newVal;
    setRange([
      Math.max(minPrice, Math.min(newRange[0], newRange[1])),
      Math.min(maxPrice, Math.max(newRange[0], newRange[1]))
    ]);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Typography variant="h6">Price Range</Typography>

      {/* Гистограмма */}
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

      {/* Ввод вручную */}
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

      <Typography sx={{ mt: 2 }}>
        Selected range: ${range[0]} – ${range[1]}
      </Typography>
    </Box>
  );
}