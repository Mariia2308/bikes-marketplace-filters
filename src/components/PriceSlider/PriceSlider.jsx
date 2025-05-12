// PriceSlider.js
import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setPriceRange } from '../../redux/slider/sliderSlice';
import { selectPriceRange } from '../../redux/slider/sliderSelectors';
import PriceInput from '../PriceInput/PriceInput';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import Histogram, { getHistogramDimensions } from '../Histogram/Histogram';
import PriceSliderComponent from '../PriceSliderComponent/PriceSliderComponent';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useEffect } from 'react';

const histogramData = [4, 8, 5, 9, 2, 11, 6, 10, 12, 3, 6, 10, 8, 12, 9, 5, 4, 12, 1, 6, 10, 8, 12, 9, 5, 4, 12, 6, 10, 8, 12, 9, 5, 4, 12, 6, 10, 8, 12, 9, 5, 4, 2, 3, 7, 5, 2, 9, 12, 8, 13, 5];

const minSliderLimit = 0;
const maxSliderLimit = 5600;

export default function PriceSlider() {
  const dispatch = useDispatch();
  const reduxRange = useSelector(selectPriceRange);
  const [storedRange, setStoredRange] = useLocalStorage('priceRange', reduxRange);

  useEffect(() => {
    if (storedRange && Array.isArray(storedRange)) {
      dispatch(setPriceRange(storedRange));
    }
  }, [dispatch]);

  const handleSliderChange = (event, newValue) => {
    const [newMin, newMax] = newValue;
    const clamped = [
      Math.max(minSliderLimit, newMin),
      Math.min(maxSliderLimit, newMax),
    ];
    dispatch(setPriceRange(clamped));
    setStoredRange(clamped);
  };

  const handleInputChange = (index) => (event) => {
    const input = event.target.value.replace(/[^0-9]/g, '');
    const newVal = Number(input);
    const newRange = [...reduxRange];
    newRange[index] = newVal;

    if (index === 0 && newVal > newRange[1]) newRange[1] = newVal;
    if (index === 1 && newVal < newRange[0]) newRange[0] = newVal;

    const clampedMin = Math.max(minSliderLimit, newRange[0]);
    const clampedMax = Math.min(maxSliderLimit, newRange[1]);
    const updated = [clampedMin, clampedMax];

    dispatch(setPriceRange(updated));
    setStoredRange(updated);
  };

  const averagePrice = Math.round((reduxRange[1] - reduxRange[0]) / 2);
  const bucketCount = histogramData.length;
  const priceStep = (maxSliderLimit - minSliderLimit) / bucketCount;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const { containerHeight } = getHistogramDimensions(isMobile, isTablet);

  return (
    <Box sx={{ width: '100%', margin: '0 auto', px: { xs: 2, sm: 3, md: 4 }, py: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' } }}>Price Range</Typography>
        <ThemeSwitcher />
      </Box>

      <Typography sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' } }}>
        The average nightly price is ${averagePrice}
      </Typography>

      <Box sx={{ position: 'relative', height: containerHeight + 40 }}>
        <Histogram histogramData={histogramData} range={reduxRange} priceStep={priceStep} minSliderLimit={minSliderLimit} />
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2 }}>
          <PriceSliderComponent
            range={reduxRange}
            handleSliderChange={handleSliderChange}
            minSliderLimit={minSliderLimit}
            maxSliderLimit={maxSliderLimit}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', alignItems: 'center', gap: 2 }}>
        <PriceInput label="Min price" value={reduxRange[0]} onChange={handleInputChange(0)} />
        <PriceInput label="Max price" value={reduxRange[1]} onChange={handleInputChange(1)} />
      </Box>
    </Box>
  );
}