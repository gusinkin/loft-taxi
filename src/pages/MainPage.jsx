import { React } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Map } from '../Map';
import { MapProvider } from '../context/MapProvider';

export const MainPage = () => {
  return (
    <MapProvider>
      <Header />
      <Map />
      <Outlet />
    </MapProvider>
  );
};
