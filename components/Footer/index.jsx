import React from 'react';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.body}>Магазин лучших кроссовок</div>
      </div>
    </footer>
  );
};
