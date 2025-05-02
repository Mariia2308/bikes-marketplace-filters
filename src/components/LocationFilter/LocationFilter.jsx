import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLocation } from '../../redux/filters/filterSlice';

const LocationFilter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Перевірка на підтримку геолокації в браузері
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Отримуємо широту і довготу
          const { latitude, longitude } = position.coords;
          
          // Можна зберігати локацію як координати, або конвертувати в місто через API (якщо потрібно)
          dispatch(setLocation({ latitude, longitude })); // Збереження локації в Redux
        },
        (error) => {
          // Якщо користувач відмовився або сталася помилка
          console.error('Geolocation error: ', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [dispatch]);

  return (
    <div>
      <h3>Your location is being detected...</h3>
    </div>
  );
};

export default LocationFilter;
