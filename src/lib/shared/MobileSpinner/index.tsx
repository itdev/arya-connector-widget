import React from 'react';
import styles from './styles.module.css';
import { SpinLoading } from 'antd-mobile';

export default function LoadingSpinner() {
  return <SpinLoading className={styles.spinner} color="primary" />;
}
