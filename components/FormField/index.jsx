import { TextField } from '@mui/material';
import React from 'react';
import styles from './FormField.module.scss';

export const FormField = ({ name, label, type, value, onChange }) => {
  return (
    <TextField
      classes={{ root: styles.root }}
      name={name}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      size="small"
      fullWidth
    />
  );
};
