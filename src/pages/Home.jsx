import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BikesList from '../components/BikesList/BikesList';
import PriceSlider from '../components/PriceSlider/PriceSlider';
import Loader from '../components/Loader/Loader';
import { fetchBikes } from '../redux/bikes/bikeSlice';
import { selectLoading } from '../redux/bikes/bikeSelectors';

function Home() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading); // ✅ правильний селектор

  useEffect(() => {
    dispatch(fetchBikes());
  }, [dispatch]);

  return (
    <div>
      <div style={{ padding: '1rem 1.2rem', borderBottom: '1px solid #ccc', paddingBottom: '1.2rem' }}>
        <h2>Filters</h2>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Loader />
        </div>
      ) : (
        <>
          <PriceSlider />
          <BikesList />
        </>
      )}
    </div>
  );
}

export default Home;
