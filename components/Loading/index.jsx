import { CircularProgress } from '@mui/material';
import React from 'react';
import styles from './Loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.loader}>
      <CircularProgress classes={{ root: styles.root }} color="inherit" />
    </div>
  );
};

export default Loading;
