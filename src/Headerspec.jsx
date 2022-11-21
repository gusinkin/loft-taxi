import * as router from 'react-router';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender } from './utils/customRender';
import { Header } from './Header';

describe('Header', () => {
  const currentState = {
    ui: {
      page: 'order',
    },
    user: {
      isLoggedIn: true,
      data: {
        email: 'test@test.com',
        password: '123123',
        name: 'Dmitry',
        surname: 'Gusinkin',
      },
    },
  };

  const navigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });

  it('logs out correctly', () => {
    const { store } = customRender(<Header />, currentState);

    userEvent.click(screen.getByTestId('logout-btn'));
    expect(navigate).toHaveBeenCalledWith('/');

    const newState = store.getState();
    expect(newState.ui.page).toBe('login');
    expect(newState.user.isLoggedIn).toBe(false);
    expect(newState.user.data.email).toBe('');
    expect(newState.user.data.password).toBe('');
    expect(newState.user.data.name).toBe('');
    expect(newState.user.data.surname).toBe('');
  });
});
