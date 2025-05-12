import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLocation } from '../../redux/filters/filterSlice';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import styles from './ButtonsStyles/FilterButtons.module.scss';

const FilterLocationButton = () => {
  const dispatch = useDispatch();
  const [, setSavedLocation] = useLocalStorage('location', null);

  const handleUseBrowserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();

          const city = data.address.city || data.address.town || data.address.village || '';
          const country = data.address.country || '';

          const detectedLocation = { country, city };

          dispatch(setLocation(detectedLocation));
          setSavedLocation(detectedLocation);
        } catch (err) {
          console.error('Error during geolocation:', err);
        }
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('location'));
    if (saved) {
      dispatch(setLocation(saved));
    }
  }, [dispatch]);

  return (
    <button className={styles.filterButton} onClick={handleUseBrowserLocation}>
      Closest
    </button>
  );
};

export default FilterLocationButton;
