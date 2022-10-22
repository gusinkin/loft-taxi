import { React, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import { setPage } from '../redux/ui/actions';
import { logged } from '../redux/user/selector';
import { coords } from '../redux/order/selector';
import { mapConfig } from '../MapConfig';
import { Header } from '../Header';
import { Order } from '../Order';

export const MapPage = () => {
  const mapContainer = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector(logged);
  const coordinates = useSelector(coords);

  useEffect(() => {
    mapboxgl.accessToken = mapConfig.token;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [30.3056504, 59.9429126],
      zoom: 10,
    });

    map.on('load', () => {
      if (coordinates.length !== 0) {
        map.flyTo({
          center: coordinates[0],
          zoom: 15,
        });

        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: coordinates,
              },
            },
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#ffc617',
            'line-width': 8,
          },
        });
      } else {
        map.removeSource('route');
      }
    });

    return () => {
      map.remove();
    };
  }, [coordinates]);

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
