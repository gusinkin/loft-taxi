import React from 'react';
import { LoginPageWithAuth } from './LoginPage';
import { render } from '@testing-library/react';

describe('LoginPage', () => {
  describe('when logged out', () => {
    it('renders login form', () => {
      const { getByLabelText } = render(<LoginPageWithAuth />);
      expect(getByLabelText('Email')).toHaveAttribute('name', 'email');
      expect(getByLabelText('Пароль')).toHaveAttribute('name', 'password');
    });
  });
  describe('when logged in', () => {
    it('renders profile link', () => {
      const { getByText } = render(<LoginPageWithAuth isLoggedIn />);
      expect(getByText('go to profile')).toBeInTheDocument();
    });
  });
});
