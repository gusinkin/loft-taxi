import React from 'react';
import { LoginPageWithAuth } from './LoginPage';
import { render } from '@testing-library/react';

describe('LoginPage', () => {
  it('renders login form', () => {
    const { getByLabelText } = render(<LoginPageWithAuth />);
    expect(getByLabelText('Email')).toHaveAttribute('name', 'email');
    expect(getByLabelText('Пароль')).toHaveAttribute('name', 'password');
  });
});
