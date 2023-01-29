import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegPage } from './pages/RegPage';
import { MainPage } from './pages/MainPage';
import { Order } from './components/Order';
import { Profile } from './components/Profile';
import styled from 'styled-components';
import bg from './images/bg-map.png';

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

const StyledApp = styled.div`
  height: 100vh;
  background-image: url(${bg});
`;
export default App;
