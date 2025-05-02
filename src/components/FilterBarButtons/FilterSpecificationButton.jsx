import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../redux/filters/filterSlice';
import { selectSelectedCategories, selectUniqueCategories } from '../../redux/filters/filterSelectors';
import styles from './FilterButtons.module.scss';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FilterSpecificationButton = () => {
  const dispatch = useDispatch();
  const selectedCategories = useSelector(selectSelectedCategories);
  const categories = useSelector(selectUniqueCategories);

  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (e) => {
    const category = e.target.value;
    if (selectedCategories.includes(category)) {
      dispatch(setCategory(selectedCategories.filter(c => c !== category)));
    } else {
      dispatch(setCategory([...selectedCategories, category]));
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.filterContainer}>
      <button className={styles.filterButton} onClick={toggleDropdown}>
        Specification
        {isOpen ? <FaChevronUp className={styles.chevron} /> : <FaChevronDown className={styles.chevron} />}
      </button>

      {isOpen && (
        <div className={styles.dropdownList}>
          <div className={styles.checkboxContainer}>
            {categories.map(category => (
              <div key={category} className={styles.checkboxItem}>
                <label className={styles.checkboxLabel}>
                  {category}
                  <input
                    type="checkbox"
                    value={category}
                    checked={selectedCategories.includes(category)}
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

export default FilterSpecificationButton;
