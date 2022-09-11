import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LoginPage } from './pages/LoginPage';
import { MapPage } from './pages/MapPage';
import { ProfilePage } from './pages/ProfilePage';
import { RegPage } from './pages/RegPage';
import './styles/App.css';

const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path='/reg' element={<RegPage />} />
        <Route path='/map' element={<MapPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

App.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default App;
