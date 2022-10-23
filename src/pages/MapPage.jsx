import { React } from 'react';
import { Header } from '../Header';
import { Map } from '../Map';
import { Order } from '../Order';

export const MapPage = () => {
  return (
    <div className='map-page'>
      <Header />
      <Map />
      <Order />
    </div>
  );
};
