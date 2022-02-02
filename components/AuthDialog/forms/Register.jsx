import React, { useContext, useState } from 'react';
import { Button } from '../../buttons/ButtonBlue';
import { FormField } from '../../FormField';
import styles from './Forms.module.scss';
import { postData } from '../../../utils/fetchData';
import validation from '../../../utils/validations';
import { DataContext } from '../../../store/GlobalState';
import { useForm } from 'react-hook-form';

export const RegisterForm = ({ onOpenLogin }) => {
  const initialState = { firstName: '', lastName: '', email: '', password: '' };
  const [userData, setUserData] = useState(initialState);
  const { firstName, lastName, email, password } = userData;

  const { state, dispatch } = useContext(DataContext);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: 'NOTIFY', payload: {} });
  };

  const { handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;

  const onSubmit = async () => {
    const errMsg = validation(firstName, lastName, email, password);
    if (errMsg) return dispatch({ type: 'NOTIFY', payload: { error: errMsg } });

    dispatch({ type: 'NOTIFY', payload: { loading: true } });

    const res = await postData('auth/register', userData);
    if (res.error) return dispatch({ type: 'NOTIFY', payload: { error: res.error } });

    return dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
  };

  return (
    <>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="firstName"
          label="Имя"
          type="text"
          value={firstName}
          onChange={handleChangeInput}
        />
        <FormField
          name="lastName"
          label="Фамилия"
          type="text"
          value={lastName}
          onChange={handleChangeInput}
        />
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
          <div className={styles.action}>
            Есть аккаунт?
            <div className={styles.btnTransition} onClick={onOpenLogin}>
              Войти
            </div>
          </div>
          <Button className={isSubmitting && 'disabled'} type="submit">
            Регистрация
          </Button>
        </div>
      </form>
    </>
  );
};
