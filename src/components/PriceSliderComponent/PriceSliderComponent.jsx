import React from 'react';
import { Slider } from '@mui/material';

const PriceSliderComponent = ({ range, handleSliderChange, minSliderLimit, maxSliderLimit }) => {
  return (
    <Slider
      value={range}
      min={minSliderLimit}
      max={maxSliderLimit}
      step={5}
      onChange={handleSliderChange}
      valueLabelDisplay="off"
      disableSwap = "off"
      sx={{
        color: 'var(--accent-color)',
        padding: 0,
        '& .MuiSlider-thumb': {
          borderRadius: '50%',
          width: 20,
          height: 20,
          backgroundColor: 'var(--accent-color)',
          border: '1px solid var(--bg-color)',
        },
        '& .MuiSlider-rail': {
          height: 6,
          backgroundColor: 'var(--rail-color)',
          borderRadius: 3,
        },
        '& .MuiSlider-track': {
          height: 6,
          backgroundColor: 'var(--track-color)',
          borderRadius: 3,
        },
      }}
    />
  );
};

export default PriceSliderComponent;
