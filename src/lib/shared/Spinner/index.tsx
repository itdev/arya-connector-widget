import React from 'react';
import styles from './styles.module.css';

export default function LoadingSpinner() {
  return (
    <div className={styles.root}>
      <div className={styles.spinner}></div>
    </div>
  );
}
