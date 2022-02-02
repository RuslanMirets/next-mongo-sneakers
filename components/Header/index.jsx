/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import styles from './Header.module.scss';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { DrawerCart } from '../Drawer';
import { AuthDialog } from '../AuthDialog';
import { DataContext } from '../../store/GlobalState';
import Cookies from 'js-cookie';

export const Header = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, notify } = state;

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const [authDialogOpen, setAuthDialogOpen] = React.useState(false);
  const toggleAuthDialog = () => {
    setAuthDialogOpen(!authDialogOpen);
  };

  useEffect(() => {
    if (notify.success) setAuthDialogOpen(false);
  }, [authDialogOpen, notify]);

  const handleLogout = () => {
    Cookies.remove('refreshtoken', { path: 'api/auth/accessToken' });
    localStorage.removeItem('firstLogin');
    dispatch({ type: 'AUTH', payload: {} });
    dispatch({ type: 'NOTIFY', payload: { success: 'Выход из системы' } });
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.body}>
          <Link href="/">
            <a>
              <img src="/static/logo.svg" alt="Logo" />
            </a>
          </Link>
          <ul className={styles.actions}>
            {Object.keys(auth).length !== 0 ? (
              <>
                <li onClick={toggleDrawer}>
                  <LocalMallOutlinedIcon />
                  1205 руб.
                </li>
                <li>
                  <Link href="/favorites">
                    <a>
                      <FavoriteBorderOutlinedIcon />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/profile">
                    <a>
                      {auth.user.avatar ? (
                        <img className={styles.avatar} src={auth.user.avatar} alt="avatar" />
                      ) : (
                        <AccountCircleOutlinedIcon />
                      )}
                    </a>
                  </Link>
                </li>
                <li onClick={handleLogout}>
                  <LogoutOutlinedIcon />
                </li>
              </>
            ) : (
              <>
                <li onClick={toggleAuthDialog}>
                  <LoginOutlinedIcon />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <DrawerCart open={drawerOpen} onClose={toggleDrawer} />
      <AuthDialog open={authDialogOpen} onClose={toggleAuthDialog} />
    </header>
  );
};
