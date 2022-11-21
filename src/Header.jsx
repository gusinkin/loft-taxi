import { React, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { setPage } from './redux/ui/actions';
import { logOut } from './redux/user/actions';
import { logged } from './redux/user/selector';
import headerLogo from './svg/header.svg';
import './styles/App.css';
import './styles/Header.css';

export const Header = () => {
  const navigate = useNavigate();
  const loggedIn = useSelector(logged);
  const dispatch = useDispatch();

  const changeState = useCallback(
    (pageName) => {
      dispatch(setPage(pageName));
    },
    [dispatch]
  );

  const unAuth = () => {
    dispatch(logOut());
    navigate('/');
    changeState('login');
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate('/');
      changeState('login');
    }
  }, [loggedIn, navigate, changeState]);

  return (
    <header className='header'>
      <img src={headerLogo} className='header__logo' alt='logo' />
      <nav>
        <ul className='header__list'>
          <li>
            <Link to='/main/order'>
              <button
                type='button'
                className='header__button button'
                onClick={() => changeState('order')}
              >
                Карта
              </button>
            </Link>
          </li>
          <li>
            <Link to='/main/profile'>
              <button
                type='button'
                className='header__button button'
                onClick={() => changeState('profile')}
              >
                Профиль
              </button>
            </Link>
          </li>
          <li>
            <button
              data-testid='logout-btn'
              type='button'
              className='header__button button'
              onClick={() => unAuth()}
            >
              Выйти
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  logIn: PropTypes.func,
  logOut: PropTypes.func,
  changeState: PropTypes.func,
};
