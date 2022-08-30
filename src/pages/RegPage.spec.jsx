import React from 'react';
import { RegPage } from './RegPage';
import { render } from '@testing-library/react';

describe('RegPage', () => {
  it('renders registration form', () => {
    const { getByLabelText } = render(<RegPage />);
    expect(getByLabelText('Email')).toHaveAttribute('name', 'email');
    expect(getByLabelText('Как Вас зовут?')).toHaveAttribute(
      'name',
      'userName'
    );
    expect(getByLabelText('Придумайте пароль')).toHaveAttribute(
      'name',
      'password'
    );
  });
});
