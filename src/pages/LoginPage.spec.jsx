import { customRender } from '../utils/customRender';
import { LoginPage } from './LoginPage';

describe('LoginPage', () => {
  it('renders login form', () => {
    const { getByLabelText } = customRender(<LoginPage />);
    expect(getByLabelText('Email')).toHaveAttribute('name', 'email');
    expect(getByLabelText('Пароль')).toHaveAttribute('name', 'password');
  });
});
