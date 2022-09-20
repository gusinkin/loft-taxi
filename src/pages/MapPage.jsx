import { React, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import { setPage } from '../redux/ui/actions';
import { logged } from '../redux/user/selector';
import { mapConfig } from '../MapConfig';
import { Header } from '../Header';
import { Order } from '../Order';

export const MapPage = () => {
  const map = useRef();
  const mapContainer = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector(logged);

  useEffect(() => {
    mapboxgl.accessToken = mapConfig.token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [43.97923, 56.311465],
      zoom: 10,
    });

    return () => {
      map.current.remove();
    };
  }, []);

  const changeState = useCallback(
    (pageName) => {
      dispatch(setPage(pageName));
    },
    [dispatch]
  );

  useEffect(() => {
    if (loggedIn) {
      navigate('/map');
      changeState('map');
    } else {
      navigate('/');
      changeState('login');
    }
  }, [loggedIn, navigate, changeState]);

  return (
    <>
      <Header />
      <div className='map-wrapper'>
        <div data-testid='map' className='map' ref={mapContainer} />
      </div>
      <Order />
    </>
  );
};
