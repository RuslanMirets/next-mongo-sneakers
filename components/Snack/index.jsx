import { Alert } from '@mui/material';
import React from 'react';
import Snackbar from '@mui/material/Snackbar';

const Snack = ({ message, handleShow, severity }) => {
  return (
    <Snackbar open autoHideDuration={4000} onClose={handleShow}>
      <Alert onClose={handleShow} severity={severity} sx={{ width: '100%' }}>
        {message.message}
      </Alert>
    </Snackbar>
  );
};

export default Snack;
