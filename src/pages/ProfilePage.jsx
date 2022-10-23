import { React } from 'react';
import { Header } from '../Header';
import { Map } from '../Map';
import { Profile } from '../Profile';
import '../styles/Form.css';

export const ProfilePage = () => {
  return (
    <div className='profile-page'>
      <Header />
      <Map />
      <Profile />
    </div>
  );
};
