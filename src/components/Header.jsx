import { React, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setPage } from '../redux/store/ui/actions';
import { logOut } from '../redux/store/user/actions';
import { page } from '../redux/store/ui/selector';
import { logged } from '../redux/store/user/selector';
import headerLogo from '../svg/header.svg';
import styled from 'styled-components';

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
    <StyledHeader>
      <HeaderLogo>
        <HeaderLogoImg src={headerLogo} alt='logo' />
      </HeaderLogo>
      <HeaderList>
        <HeaderItem>
          <Link to='/main/order'>
            <HeaderButton
              type='button'
              active={currentPage === 'order' ? true : false}
              onClick={() => changeState('order')}
            >
              Карта
            </HeaderButton>
          </Link>
        </HeaderItem>
        <HeaderItem>
          <Link to='/main/profile'>
            <HeaderButton
              type='button'
              active={currentPage === 'profile' ? true : false}
              onClick={() => changeState('profile')}
            >
              Профиль
            </HeaderButton>
          </Link>
        </HeaderItem>
        <HeaderItem>
          <HeaderButton
            data-testid='logout-btn'
            type='button'
            onClick={() => unAuth()}
          >
            Выйти
          </HeaderButton>
        </HeaderItem>
      </HeaderList>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  background-color: #1c1a19;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLogo = styled.div`
  padding: 10px;
`;

const HeaderLogoImg = styled.img`
  width: 100%;
`;

const HeaderList = styled.nav`
  display: flex;
  align-items: center;
  list-style: none;
`;

const HeaderItem = styled.li`
  margin: 0 20px;
`;

const HeaderButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ active }) => (active ? '#fdbf5a' : '#fff')};
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 5px;
  &:hover {
    color: #fdbf5a;
  }
`;
