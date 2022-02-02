import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { LoginFormSchema } from '../../../utils/validations';
import { Button } from '../../buttons/ButtonBlue';
import { FormField } from '../../FormField';
import styles from './Forms.module.scss';

export const LoginForm = ({ onOpenRegister }) => {
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema),
    reValidateMode: 'onChange',
  });

  return (
    <FormProvider {...form}>
      <h2>Авторизация</h2>
      <form>
        <FormField name="email" label="Email" type="email" />
        <FormField name="password" label="Пароль" type="password" />
        <div className={styles.actions}>
          <div>
            <div className={styles.btnTransition} onClick={onOpenRegister}>
              Регистрация
            </div>
          </div>
          <Button>Войти</Button>
        </div>
      </form>
    </FormProvider>
  );
};
