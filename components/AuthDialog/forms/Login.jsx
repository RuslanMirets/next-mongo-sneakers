import React, { useContext, useState } from 'react';
import { Button } from '../../buttons/ButtonBlue';
import { FormField } from '../../FormField';
import styles from './Forms.module.scss';
import Cookie from 'js-cookie';
import { postData } from '../../../utils/fetchData';
import { DataContext } from '../../../store/GlobalState';
import { useForm } from 'react-hook-form';

export const LoginForm = ({ onOpenRegister }) => {
  const initialState = { email: '', password: '' };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const { state, dispatch } = useContext(DataContext);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: 'NOTIFY', payload: {} });
  };

  const { handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;

  const onSubmit = async () => {
    dispatch({ type: 'NOTIFY', payload: { loading: true } });
    const res = await postData('auth/login', userData);

    if (res.error) return dispatch({ type: 'NOTIFY', payload: { error: res.error } });
    dispatch({ type: 'NOTIFY', payload: { success: res.msg } });

    dispatch({
      type: 'AUTH',
      payload: {
        token: res.access_token,
        user: res.user,
      },
    });

    Cookie.set('refreshtoken', res.refresh_token, {
      path: 'api/auth/accessToken',
      expires: 7,
    });
    localStorage.setItem('firstLogin', true);
  };

  return (
    <>
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="email"
          label="Email"
          type="email"
          value={email}
          onChange={handleChangeInput}
        />
        <FormField
          name="password"
          label="Пароль"
          type="password"
          value={password}
          onChange={handleChangeInput}
        />
        <div className={styles.actions}>
          <div>
            <div className={styles.btnTransition} onClick={onOpenRegister}>
              Регистрация
            </div>
          </div>
          <Button className={isSubmitting && 'disabled'} type="submit">
            Войти
          </Button>
        </div>
      </form>
    </>
  );
};
