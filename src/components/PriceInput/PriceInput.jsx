import React from 'react';
import styles from './PriceInput.module.scss';

export default function PriceInput({ label, value, onChange }) {
  return (
    <div className={styles.priceInput}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <span className={styles.dollar}>$</span>
        <input
          type="text"
          value={value}
          onChange={onChange}
          className={styles.input}
          inputMode="numeric"
          pattern="[0-9]*"
        />
      </div>
    </div>
  );
}
