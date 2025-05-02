// BikeCard.js
import React from 'react';
import styles from './BikeCard.module.scss'; // Імпортуємо CSS модулі для стилізації

const BikeCard = ({ bike }) => {
  if (!bike) return null; // нічого не рендеримо, якщо даних немає

  const { title, price, category, location, createdAt, retailer, isNew } = bike;

  // Перевірка, чи є об'єкт location, і виведення його властивостей
  const locationText = location ? `${location.city}` : 'Локація не вказана';

  return (
    <div className={styles.bikeCard}>
      <div className={styles.bikeCard__content}>
        <div className={styles.bikeCard__left}>
          <p className={styles.bikeCard__category}>{category || 'Невідома категорія'}</p>
          <h3 className={styles.bikeCard__title}>{title || 'Без назви'}</h3>
          <p className={styles.bikeCard__location}>{locationText}</p>
        </div>

        <div className={styles.bikeCard__right}>
          <p className={styles.bikeCard__price}>{price ? `$${price}` : 'Ціну уточнюйте'}</p>
        </div>
      </div>

      <div className={styles.bikeCard__footer}>
        <p className={styles.bikeCard__createdAt}>
          {createdAt ? `Створено: ${new Date(createdAt).toLocaleDateString()}` : 'Дата не вказана'}
        </p>
        <p className={styles.bikeCard__retailer}>
          {retailer || 'Ретейлер не вказаний'}
        </p>
      </div>

      {/* Виводимо позначку "New", якщо велосипед новий */}
      {isNew && <span className="new-badge">New</span>}
    </div>
  );
};

export default BikeCard;
