import React from 'react';
import { ProfilePageWithAuth } from './ProfilePage';
import { render, fireEvent } from '@testing-library/react';

jest.mock('./LoginPage', () => ({
  LoginPageWithAuth: () => <div>Login Page</div>,
}));

describe('ProfilePage', () => {
  it('renders correctly', () => {
    const { container } = render(<ProfilePageWithAuth />);
    expect(container.innerHTML).toMatch('Profile page');
  });
  describe('logout button', () => {
    it('logs out and shows login page', () => {
      const { getByText, container } = render(<ProfilePageWithAuth />);
      fireEvent.click(getByText('Log out'));
      expect(container.innerHTML).toMatch('Login Page');
    });
  });
});
