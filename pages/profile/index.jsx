import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { DataContext } from '../../store/GlobalState';

const Profile = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const router = useRouter();

  useEffect(() => {
    if (Object.keys(auth).length === 0) router.push('/');
  }, [auth, router]);

  return (
    <MainLayout title="Профиль">
      <div className="container">Profile</div>
    </MainLayout>
  );
};

export default Profile;
