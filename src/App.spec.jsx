import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
// import LoginPageWithAuth from './pages/LoginPage';

jest.mock('./pages/LoginPage', () => ({
  LoginPageWithAuth: () => <div>Login Page</div>,
}));
jest.mock('./pages/MapPage', () => ({
  MapPage: () => <div>Map Page</div>,
}));
jest.mock('./pages/ProfilePage', () => ({
  ProfilePageWithAuth: () => <div>Profile Page</div>,
}));

describe('App', () => {
  it('renders correctly', () => {
    const { container } = render(<App />);
    expect(container.innerHTML).toMatch('Login Page');
  });

  describe('when clicked on navigation buttons', () => {
    it('opens the corresponding page', () => {
      const { getByText, container } = render(<App isLoggedIn />);
      fireEvent.click(getByText('Карта'));
      expect(container.innerHTML).toMatch('Map Page');
      fireEvent.click(getByText('Профиль'));
      expect(container.innerHTML).toMatch('Profile Page');
      fireEvent.click(getByText('Логин'));
      expect(container.innerHTML).toMatch('Login Page');
    });
  });
});
