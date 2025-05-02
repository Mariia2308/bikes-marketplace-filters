import React from 'react';
import BikesList from '../components/BikesList/BikesList';
import ThemeSwitcher from '../components/ThemeSwitcher/ThemeSwitcher'; // Імпортуємо компонент для перемикання теми
import PriceSlider from '../components/PriceSlider/PriceSlider';


function Home() {
  return (
    <div>
      <ThemeSwitcher />
      <PriceSlider />    
      <BikesList />
    </div>
  );
}

export default Home;
