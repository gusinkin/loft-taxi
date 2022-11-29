import { React, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { setPage } from '../redux/ui/actions';
import { logOut } from '../redux/user/actions';
import { page } from '../redux/ui/selector';
import { logged } from '../redux/user/selector';
import headerLogo from '../svg/header.svg';
import * as S from './styles';

export const Header = () => {
  const navigate = useNavigate();
  const currentPage = useSelector(page);
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
    <S.Header>
      <img src={headerLogo} alt='logo' />
      <nav>
        <S.HeaderList>
          <li>
            <Link to='/main/order'>
              <S.HeaderButton
                type='button'
                active={currentPage === 'order' ? true : false}
                onClick={() => changeState('order')}
              >
                Карта
              </S.HeaderButton>
            </Link>
          </li>
          <li>
            <Link to='/main/profile'>
              <S.HeaderButton
                type='button'
                active={currentPage === 'profile' ? true : false}
                onClick={() => changeState('profile')}
              >
                Профиль
              </S.HeaderButton>
            </Link>
          </li>
          <li>
            <S.HeaderButton
              data-testid='logout-btn'
              type='button'
              onClick={() => unAuth()}
            >
              Выйти
            </S.HeaderButton>
          </li>
        </S.HeaderList>
      </nav>
    </S.Header>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  logIn: PropTypes.func,
  logOut: PropTypes.func,
  changeState: PropTypes.func,
};
