import React from 'react';
import styles from './BikeCard.module.scss';

const BikeCard = ({ bike }) => {
  if (!bike) return null;

  const { title, price, category, location, createdAt } = bike;
  const locationText = location ? `${location.city}` : 'Unknown location';
  const isNew = new Date(createdAt) >= new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

  return (
<div className={styles.bikeCard}>
  <div className={styles.bikeCard__left}>
    {isNew && <span className={styles.newBadge}>New</span>}
    <p className={styles.bikeCard__category}>{category}</p>

    <div className={styles.bikeCard__row}>
      <h3 className={styles.bikeCard__title}>{title}</h3>
      <p className={styles.bikeCard__price}>{price ? `$${price}` : 'Ask for price'}</p>
    </div>

    <p className={styles.bikeCard__location}>{locationText}</p>
  </div>
</div>


  );
};

export default BikeCard;
