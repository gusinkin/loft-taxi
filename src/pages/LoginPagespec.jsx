import React from 'react';
import * as router from 'react-router';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender } from '../utils/customRender';
import { LoginPage } from './LoginPage';

describe('LoginPage', () => {
  it('renders login form', () => {
    const { getByLabelText } = customRender(<LoginPage />);
    expect(getByLabelText('Email')).toHaveAttribute('name', 'email');
    expect(getByLabelText('Пароль')).toHaveAttribute('name', 'password');
  });

  const currentState = {
    ui: {
      page: 'login',
    },
    user: {
      isLoggedIn: false,
      data: { email: '', password: '', name: '', surname: '' },
    },
  };

  const navigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });
  it('logs in correctly', () => {
    const { store } = customRender(<LoginPage />, currentState);

    userEvent.type(screen.getByTestId('email'), 'test@test.com');
    userEvent.type(screen.getByTestId('password'), '123123');
    // userEvent.type(screen.getByLabelText('Email'), 'test@test.com');
    // userEvent.type(screen.getByLabelText('Пароль'), '123123');

    fireEvent.submit(screen.getByTestId('login-form'), {
      target: {
        email: { value: 'test@test.com' },
        password: { value: '123123' },
      },
    });

    expect(navigate).toHaveBeenCalledWith('/map');

    const newState = store.getState();
    expect(newState.ui.page).toBe('map');
    expect(newState.user.isLoggedIn).toBe(true);
    expect(newState.user.data.email).toBe('test@test.com');
    expect(newState.user.data.password).toBe('123123');
  });
});
