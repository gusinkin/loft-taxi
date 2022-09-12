import * as router from 'react-router';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender } from './utils/customRender';
import { Header } from './Header';

describe('Header', () => {
  const currentState = {
    ui: {
      page: 'map',
      isLoggedIn: true,
      user: {
        email: 'test@test.com',
        password: '123123',
        surname: 'Gusinkin',
        name: 'Dmitry',
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
    expect(newState.ui.isLoggedIn).toBe(false);
    expect(newState.ui.user.email).toBe('');
    expect(newState.ui.user.password).toBe('');
    expect(newState.ui.user.name).toBe('');
    expect(newState.ui.user.surname).toBe('');
  });
});
