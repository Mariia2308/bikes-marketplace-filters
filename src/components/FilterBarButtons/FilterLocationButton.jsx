import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../../redux/filters/filterSlice';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import styles from './ButtonsStyles/FilterButtons.module.scss';

const FilterLocationButton = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.filters.location);
  const [, setSavedLocation] = useLocalStorage('location', null);
  const isActive = location?.city && location?.country;

  const handleUseBrowserLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    if (window.isSecureContext === false) {
      alert("Geolocation only works on HTTPS or localhost.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();

          const city = data.address.city || data.address.town || data.address.village || '';
          const country = data.address.country || '';

          if (!city && !country) {
            alert("Location could not be determined.");
            return;
          }

          const detectedLocation = { country, city };
          dispatch(setLocation(detectedLocation));
          setSavedLocation(detectedLocation);
        } catch (err) {
          console.error('Geolocation lookup error:', err);
          alert("Failed to fetch location details.");
        }
      },
      (error) => {
        console.warn("Geolocation error:", error);
        alert("Permission denied or unavailable location. This website is currently unable to recognize your location. Try opening it in your default browser.");
      }
    );
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('location'));
    if (saved) {
      dispatch(setLocation(saved));
    }
  }, [dispatch]);

  return (
    <button
      className={`${styles.filterButton} ${isActive ? styles['filterButton--active'] : ''}`}
      onClick={handleUseBrowserLocation}
    >
      Closest
    </button>
  );
};

export default FilterLocationButton;
