import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { mapConfig } from '../MapConfig';
import { Header } from '../Header';

export class MapPage extends Component {
  map = null;
  mapContainer = React.createRef();

  componentDidMount() {
    mapboxgl.accessToken = mapConfig.token;

    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [43.97923, 56.311465],
      zoom: 10,
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <>
        <Header />
        <div className='map-wrapper'>
          <div data-testid='map' className='map' ref={this.mapContainer} />
        </div>
      </>
    );
  }
}
