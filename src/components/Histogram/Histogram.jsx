// Histogram.js
import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';

export const getHistogramDimensions = (isMobile, isTablet) => {
  return {
    columnWidth: isMobile ? 3 : isTablet ? 4 : 5,
    heightMultiplier: isMobile ? 5 : isTablet ? 6 : 7,
    containerHeight: isMobile ? 60 : isTablet ? 80 : 100,
  };
};

const Histogram = ({ histogramData, range, priceStep, minSliderLimit }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const { columnWidth, heightMultiplier, containerHeight } = getHistogramDimensions(isMobile, isTablet);

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 27,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: containerHeight,
        zIndex: 1,
      }}
    >
      {histogramData.map((value, index) => {
        const price = minSliderLimit + index * priceStep;
        const inRange = price >= range[0] && price <= range[1];

        return (
          <Box
            key={index}
            sx={{
              width: `${columnWidth * 2}px`,
              height: `${value * heightMultiplier}px`,
              backgroundColor: inRange ? 'darkgrey' : 'lightgrey',
              marginLeft: index === 0 ? '4px' : '1px',
              marginRight: index === histogramData.length - 1 ? '4px' : '1px',
              transition: 'background-color 0.2s ease',
            }}
          />
        );
      })}
    </Box>
  );
};

export default Histogram;