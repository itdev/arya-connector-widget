import React from 'react';
import { ErrorMessage, FieldProps } from 'formik';
import { WidgetConfigT } from '../../AryaWidget/AryaWidget';
import styles from './styles.module.css';

interface Props extends FieldProps, WidgetConfigT {}

const CustomInputField: React.FC<Props> = ({ field, form, ...props }) => {
  const onSetNowTime = () => {
    const today = new Date();
    const time = String(today.getHours()).padStart(2, '0') + ':' + String(today.getMinutes()).padStart(2, '0');
    form.setFieldValue(field.name, time);
  };

  return (
    <div className={styles.root}>
      <div className={styles.field}>
        <div className={styles.labelCol}>
          <label htmlFor={field.name} className={styles.label}>
            {props.title}
          </label>
        </div>
        <div className={styles.inputCol}>
          <div className={styles.inputControl}>
            <div className={styles.inputControlContent}>
              <input {...field} {...props} type="time" className={styles.input} />
            </div>
            {props.type === 'time' ? (
              <button type="button" className={styles.nowBtn} onClick={onSetNowTime}>
                <span>Now</span>
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className={styles.error}>
        <ErrorMessage name={field.name} />
      </div>
    </div>
  );
};

export default CustomInputField;
