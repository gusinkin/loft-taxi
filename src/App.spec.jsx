import React from 'react';
import * as router from 'react-router';
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
