import React from 'react';
import BikesList from '../components/BikesList/BikesList';
import ThemeSwitcher from '../components/ThemeSwitcher/ThemeSwitcher'; // Імпортуємо компонент для перемикання теми
import PriceSlider from '../components/PriceSlider/PriceSlider';


function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the Bike Shop!</p>
      <p>Explore our collection of bikes and accessories.</p>
    
      <PriceSlider />
      <ThemeSwitcher />

    
      <BikesList />
    </div>
  );
}

export default Home;
