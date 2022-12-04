import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Map } from '../components/Map';
import { MapProvider } from '../context/MapProvider';
import { token } from '../redux/store/user/selector';
import { page } from '../redux/store/ui/selector';
import { getCard } from '../redux/store/payment/actions';
import styled from 'styled-components';

export const MainPage = () => {
  const dispatch = useDispatch();
  const authToken = useSelector(token);
  const currentPage = useSelector(page);

  useEffect(() => {
    dispatch(getCard(authToken));
  }, []);

  return (
    <MapProvider>
      <StyledMainPage page={currentPage}>
        <Header />
        <Map />
        <Outlet />
      </StyledMainPage>
    </MapProvider>
  );
};

const StyledMainPage = styled.div`
  &:after {
    content: '';
    position: absolute;
    top: 10%;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 4;
    width: 100%;
    height: 90%;
    background: rgba(0, 0, 0, 0.4);
    display: ${({ page }) => (page === 'profile' ? 'block' : 'none')};
  }
`;
