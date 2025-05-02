import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLocation } from '../../redux/filters/filterSlice';
import { useLocalStorage } from '../../hooks/useLocalStorage'; // Підключаємо хук

export const countriesCities = {
    'Ukraine': ['Kyiv', 'Lviv', 'Odessa', 'Kharkiv'],
    'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston'],
    'Germany': ['Berlin', 'Munich', 'Hamburg', 'Frankfurt'],
    'France': ['Paris', 'Marseille', 'Lyon', 'Toulouse'],
    'Italy': ['Rome', 'Milan', 'Naples', 'Florence'],
    // додати інші країни та міста
  };

const FilterLocationButton = () => {
  const dispatch = useDispatch();
  const [locationError, setLocationError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Використовуємо хук для збереження локації в localStorage
  const [location, setLocationInStorage] = useLocalStorage('userLocation', null);

  const handleLocationSelect = () => {
    if (selectedCountry && selectedCity) {
      dispatch(setLocation({ city: selectedCity }));
      setLocationInStorage({ city: selectedCity });
      setLocationError(null);
    } else {
      setLocationError('Please select both country and city.');
    }
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Використовуємо OpenStreetMap Nominatim API для отримання міста
          const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`;

          fetch(url)
            .then(response => response.json())
            .then(data => {
              const city = data.address.city || data.address.town || data.address.village || 'Unknown city';

              // Оновлюємо локацію в Redux і зберігаємо в localStorage
              dispatch(setLocation({ city }));
              setLocationInStorage({ city });
            })
            .catch(error => {
              setLocationError('Failed to fetch city information.');
              console.error('Geocoding error: ', error);
            });
        },
        (error) => {
          setLocationError('Failed to retrieve your location.');
          console.error('Geolocation error: ', error);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <button onClick={handleGeolocation}>Automatically detect (Geolocation)</button>

      <div>
        <h3>Or choose a location:</h3>
        <select onChange={(e) => setSelectedCountry(e.target.value)} value={selectedCountry}>
          <option value="">Select a country</option>
          {Object.keys(countriesCities).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        {selectedCountry && (
          <select onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity}>
            <option value="">Select a city</option>
            {countriesCities[selectedCountry].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        )}

        <button onClick={handleLocationSelect}>Update location</button>
      </div>

      {locationError && <p>{locationError}</p>}

      {/* Виводимо збережену локацію, якщо вона є */}
      {location && <p>Saved location: {location.city}</p>}
    </div>
  );
};

export default FilterLocationButton;


