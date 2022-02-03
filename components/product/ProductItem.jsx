/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import ButtonCheck from '../buttons/ButtonCheck';
import ButtonPlus from '../buttons/ButtonPlus';
import styles from './ProductItem.module.scss';

const ProductItem = ({ product }) => {
  const [addToCart, setAddToCart] = useState(false);
  const toggleAddCart = () => {
    setAddToCart(!addToCart);
  };

  return (
    <div className={styles.product}>
      <img className={styles.productImg} src={product.image} alt={product.image} />
      <h3 className={styles.title}>{product.title}</h3>
      <div className={styles.foot}>
        <div className={styles.price}>
          <span>Цена:</span>
          <b>{product.price} руб.</b>
        </div>
        <div className={styles.buttons} onClick={toggleAddCart}>
          {addToCart ? <ButtonCheck /> : <ButtonPlus />}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
