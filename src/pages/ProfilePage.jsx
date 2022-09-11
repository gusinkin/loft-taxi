import { React, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Logo, MCIcon } from 'loft-taxi-mui-theme';
import { setPage } from '../redux/ui/actions';
import { logged } from '../redux/ui/selector';
import { Header } from '../Header';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector(logged);

  const changeState = useCallback(
    (pageName) => {
      dispatch(setPage(pageName));
    },
    [dispatch]
  );

  useEffect(() => {
    if (loggedIn) {
      navigate('/profile');
      changeState('Profile');
    } else {
      navigate('/');
      changeState('Logout');
    }
  }, [loggedIn, navigate, changeState]);

  return (
    <div>
      <Header />
      <MCIcon />
      <Logo />
    </div>
  );
};

ProfilePage.propTypes = {
  logOut: PropTypes.func,
  setPage: PropTypes.func,
};
