import { React, useEffect, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import { mapConfig } from '../MapConfig';
import { mapContext } from '../context/MapProvider';
import { coords } from '../redux/store/order/selector';
import { getAddressList } from '../redux/store/order/actions';
import styled from 'styled-components';

export const Map = () => {
  const mapContainer = useRef(null);
  const { savedMap, setSavedMap } = useContext(mapContext);
  const dispatch = useDispatch();
  const coordinates = useSelector(coords);

  mapboxgl.accessToken = mapConfig.token;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [30.3056504, 59.9429126],
      zoom: 10,
    });

    setSavedMap(map);

    dispatch(getAddressList());

    return () => {
      setSavedMap(null);
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (savedMap) {
      if (coordinates.length !== 0) {
        savedMap.flyTo({
          center: coordinates[0],
          zoom: 15,
        });
        savedMap.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates,
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
        if (savedMap.getSource('route')) {
          savedMap.flyTo({
            center: [30.3056504, 59.9429126],
            zoom: 10,
          });
          savedMap.removeLayer('route');
          savedMap.removeSource('route');
        }
      }
    }
  }, [savedMap, coordinates]);

  return (
    <MapWrapper>
      <MapItem data-testid='map' ref={mapContainer} />
    </MapWrapper>
  );
};

const MapWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 90vh;
  overflow: hidden;
`;
const MapItem = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 2;
`;
