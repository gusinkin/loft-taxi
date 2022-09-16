import * as router from 'react-router';
import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender } from './utils/customRender';
import App from './App';

describe('App', () => {
  it('renders login form', () => {
    customRender(<App />, {});
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });
  it('navigates to registration form and back to login form', () => {
    customRender(<App />, {});
    userEvent.click(screen.getByText('Регистрация'));
    expect(screen.getByTestId('registration-page')).toBeInTheDocument();
    userEvent.click(screen.getByText('Войти'));
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });
});

describe('App login', () => {
  const currentState = {
    ui: {
      page: 'login',
      isLoggedIn: false,
      user: {
        email: '',
        password: '',
        surname: '',
        name: '',
      },
    },
  };

  const navigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    jest.spyOn(React, 'useEffect').mockImplementation((cb) => cb());
  });

  it('logs in correctly', () => {
    const { store } = customRender(<App />, currentState);

    userEvent.type(screen.getByTestId('email'), 'test@test.com');
    userEvent.type(screen.getByTestId('password'), '123123');
    // console.log(screen.getByTestId('email'));
    // console.log(screen.getByTestId('password'));
    // console.log(screen.getByTestId('email').value);
    // console.log(screen.getByTestId('password').value);
    // console.log(screen.getByTestId('login-form'));

    // expect(screen.getByTestId('email')).toHaveValue('test@test.com');
    // expect(screen.getByTestId('password')).toHaveValue('123123');

    // fireEvent.submit(screen.getByTestId('login-form'), {
    //   target: {
    //     email: { value: 'test@test.com' },
    //     password: { value: '123123' },
    //   },
    // });

    // fireEvent.submit(screen.getByRole('login-form'))

    userEvent.click(screen.getByTestId('login-btn'));
    // TypeError: Cannot read properties of undefined (reading 'value')
    // wtf? тесты на toHaveValue проходят

    expect(navigate).toHaveBeenCalledWith('/map');

    const newState = store.getState();
    expect(newState.ui.page).toBe('map');
    expect(newState.ui.isLoggedIn).toBe(true);
    expect(newState.ui.user.email).toBe('test@test.com');
    expect(newState.ui.user.password).toBe('123123');
    // expect(newState.ui.user.name).toBe('');
    // expect(newState.ui.user.surname).toBe('');
  });
});
