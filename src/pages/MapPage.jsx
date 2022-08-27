import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

export class MapPage extends Component {
  map = null;
  mapContainer = React.createRef();

  componentDidMount() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZ3VzaW5raW4iLCJhIjoiY2w3YnZocXY0MDc3ajN2b2xoc2xyZHdlcyJ9.Q96l5_OzKIleJYRPqeQe7g';

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
      <div className='map-wrapper'>
        <div data-testid='map' className='map' ref={this.mapContainer} />
      </div>
    );
  }
}
