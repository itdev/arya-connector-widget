import React from 'react';
import { WidgetConfigT } from '../../AryaWidget/AryaWidget';
import styles from './styles.module.css';

type Props = {
  widgetConfigObject: WidgetConfigT;
};
const Button: React.FC<Props> = ({ widgetConfigObject }) => {
  return (
    <button type="button" className={styles.root} name={widgetConfigObject.name}>
      <span className={styles.label}>{widgetConfigObject.title}</span>
    </button>
  );
};

export default Button;
