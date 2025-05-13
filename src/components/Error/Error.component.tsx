import React from 'react';

import styles from './Error.module.css';

export interface ErrorProps {
  /** The error message */
  children: React.ReactNode | string;
  /** The error id to hook up the error message with the input element (for accessibility) */
  errorId?: string;
}

export const Error = ({ children, errorId }: ErrorProps) => {
  return (
    <span
      className={styles.base}
      role='alert'
      id={errorId}
      aria-live='assertive'
    >
      ❌ {children}
    </span>
  );
};
