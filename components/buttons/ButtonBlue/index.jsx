import React from 'react';
import styles from './Button.module.scss';

export const Button = ({ children, className }) => {
  return <button className={`${styles.button} ${className}`}>{children}</button>;
};
