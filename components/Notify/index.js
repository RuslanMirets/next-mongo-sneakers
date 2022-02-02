import React, { useContext } from 'react';
import { DataContext } from '../../store/GlobalState';
import Snack from '../Snack';

const Notify = () => {
  const [state, dispatch] = useContext(DataContext);

  const { notify } = state;

  return (
    <>
      {notify.error && (
        <Snack
          message={{ message: notify.error }}
          handleShow={() => dispatch({ type: 'NOTIFY', payload: {} })}
          severity="error"
        />
      )}
      {notify.success && (
        <Snack
          message={{ message: notify.success }}
          handleShow={() => dispatch({ type: 'NOTIFY', payload: {} })}
          severity="success"
        />
      )}
    </>
  );
};

export default Notify;
