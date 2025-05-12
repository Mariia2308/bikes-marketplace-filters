import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BikesList from '../components/BikesList/BikesList';
import PriceSlider from '../components/PriceSlider/PriceSlider';
import { selectLoading } from '../redux/bikes/bikeSelectors';
import { fetchBikes } from '../redux/bikes/bikeSlice';
import Loader from '../components/Loader/Loader';

function Home() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchBikes());
  }, [dispatch]);

  return (
    <div >
      <div style={{ padding: '1rem 1.2rem ', borderBottom: '1px solid #ccc', paddingBottom: '1.2rem' }}>
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
