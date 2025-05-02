import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRetailer } from '../../redux/filters/filterSlice'; // Імпортуємо action для зміни рітейлера  
import { selectSelectedRetailer, selectUniqueRetailers } from '../../redux/filters/filterSelectors';
import styles from './FilterButtons.module.scss';  // Імпортуємо стилі
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';  // Іконки для стрілки

const FilterRetailButton = () => {
  const dispatch = useDispatch();
  const selectedRetailers = useSelector(selectSelectedRetailer);
  const retailers = useSelector(selectUniqueRetailers);
  
  const [isOpen, setIsOpen] = useState(false); // Стан для відображення/сховування списку

  const handleCheckboxChange = (e) => {
    const retailer = e.target.value;
    if (selectedRetailers.includes(retailer)) {
      // Видалення рітейлера, якщо він вже вибраний
      dispatch(setRetailer(selectedRetailers.filter(r => r !== retailer)));
    } else {
      // Додавання рітейлера до вибраних
      dispatch(setRetailer([...selectedRetailers, retailer]));
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Перемикання стану випадаючого списку
  };

  return (
    <div className={styles.filterContainer}>
      {/* Кнопка для відкриття/закриття списку */}
      <button className={styles.filterButton} onClick={toggleDropdown}>
        Retailer
        {isOpen ? <FaChevronUp className={styles.chevron} /> : <FaChevronDown className={styles.chevron} />}
      </button>
      
      {/* Випадаючий список рітейлерів */}
      {isOpen && (
        <div className={styles.dropdownList}>
          <div className={styles.checkboxContainer}>
            {retailers.map(retailer => (
              <div key={retailer} className={styles.checkboxItem}>
                <label className={styles.checkboxLabel}>
                  {retailer}
                  <input
                    type="checkbox"
                    value={retailer}
                    checked={selectedRetailers.includes(retailer)}
                    onChange={handleCheckboxChange}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterRetailButton;