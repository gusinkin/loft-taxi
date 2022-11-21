import React from 'react';
import { Map } from './Map';
import { render } from '@testing-library/react';
import mapbox from 'mapbox-gl';
import { customRender } from '../utils/customRender';

jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({ remove: () => {} })),
}));

describe('Map', () => {
  it('renders correctly', () => {
    const { getByTestId } = customRender(<Map />);
    expect(mapbox.Map).toHaveBeenCalledWith({
      center: [43.97923, 56.311465],
      container: getByTestId('map'),
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 10,
    });
  });
});
