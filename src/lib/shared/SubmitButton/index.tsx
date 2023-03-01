import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.css';

type Props = {
  disabled?: boolean;
};

const SubmitButton: React.FC<Props> = (props) => {
  return (
    <button
      type="submit"
      className={classNames(styles.root, {
        [styles.disabled]: !!props.disabled,
      })}
      disabled={!!props.disabled}
    >
      <span className={styles.label}>Submit</span>
    </button>
  );
};

export default SubmitButton;
