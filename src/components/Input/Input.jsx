import React, { forwardRef } from 'react';
import styles from './Input.module.scss';
const Input = forwardRef(
  ({ typeInput, placeholderInput, error, label, ...register }, ref) => {
    return (
      <div>
        <label className={styles.label}>
          <span>{label}</span>
          <input
            ref={ref}
            type={typeInput}
            placeholder={placeholderInput}
            {...register}
          />
          {error ? <p className={styles.erro}>{error.message}</p> : null}
        </label>
      </div>
    );
  },
);

export default Input;
