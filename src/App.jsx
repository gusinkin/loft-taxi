import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LoginPage } from './pages/LoginPage';
import { RegPage } from './pages/RegPage';
import { MainPage } from './pages/MainPage';
import { Order } from './components/Order';
import { Profile } from './components/Profile';
import bg from './images/bg-map.png';
import styled from 'styled-components';

const App = () => {
  return (
    <StyledApp background={bg}>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path='/reg' element={<RegPage />} />
        <Route path='/main' element={<MainPage />}>
          <Route path='order' element={<Order />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </StyledApp>
  );
};

App.propTypes = {
  isLoggedIn: PropTypes.bool,
};

const StyledApp = styled.div`
  height: 100vh;
  background-image: url(${bg});
`;
export default App;
