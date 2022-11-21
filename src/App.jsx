import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LoginPage } from './pages/LoginPage';
import { RegPage } from './pages/RegPage';
import { MainPage } from './pages/MainPage';
import { Order } from './Order';
import { Profile } from './Profile';
import './styles/App.css';

const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path='/reg' element={<RegPage />} />
        <Route path='/main' element={<MainPage />}>
          <Route path='order' element={<Order />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
};

App.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default App;
