import { screen } from '@testing-library/react';
import { customRender } from '../utils/customRender';
import { ProfilePage } from './ProfilePage';
describe('Profile page', () => {
  it('renders correctly', () => {
    customRender(<ProfilePage />, {});
    expect(screen.getByTestId('profile-page')).toBeInTheDocument();
  });
});
