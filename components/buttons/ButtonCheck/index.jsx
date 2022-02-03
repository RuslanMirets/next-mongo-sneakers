/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './ButtonCheck.module.scss'

const ButtonCheck = () => {
  return (
    <button className={styles.button}>
      <img src="/static/btn-check.svg" alt="" />
    </button>
  );
};

export default ButtonCheck;
