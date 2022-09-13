import React from 'react';
import mapboxgl from 'mapbox-gl';
import { mapConfig } from '../MapConfig';
import { Header } from '../Header';
import { useEffect } from 'react';
import { useRef } from 'react';

export const MapPage = () => {
  const map = useRef();
  const mapContainer = useRef();

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

  return (
    <>
      <Header />
      <div className='map-wrapper'>
        <div data-testid='map' className='map' ref={mapContainer} />
      </div>
    </>
  );
};
