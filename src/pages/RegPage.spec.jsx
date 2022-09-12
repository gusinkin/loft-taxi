import { RegPage } from './RegPage';
import { customRender } from '../utils/customRender';

describe('RegPage', () => {
  it('renders registration form', () => {
    const { getByLabelText } = customRender(<RegPage />);
    expect(getByLabelText('Email*')).toHaveAttribute('name', 'email');
    expect(getByLabelText('Как Вас зовут?*')).toHaveAttribute(
      'name',
      'userName'
    );
    expect(getByLabelText('Придумайте пароль*')).toHaveAttribute(
      'name',
      'password'
    );
  });
});
