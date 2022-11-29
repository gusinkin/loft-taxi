import { React, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setPage, setLoading } from '../redux/ui/actions';
import { authenticate } from '../redux/user/actions';
import { logged } from '../redux/user/selector';
import { loading } from '../redux/ui/selector';
import sideBarLogo from '../svg/sidebar.svg';
import loadingAnim from '../images/loading.gif';
import * as S from './styles';

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector(logged);
  const isLoading = useSelector(loading);

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(false));
    }
  }, []);

  const setUser = (event) => {
    event.preventDefault();

    const { email, password } = event.target;

    const payload = {
      email: email.value,
      password: password.value,
    };
    dispatch(authenticate(payload));
  };

  const changeState = useCallback(
    (pageName) => {
      dispatch(setPage(pageName));
    },
    [dispatch]
  );

  useEffect(() => {
    if (loggedIn) {
      navigate('/main/order');
      changeState('order');
    }
  }, [loggedIn, navigate, changeState]);

  return (
    <S.Page loading={isLoading ? 1 : 0} data-testid='login-page'>
      <S.Spinner loading={isLoading ? 1 : 0}>
        <img src={loadingAnim} alt='loading' />
      </S.Spinner>
      <S.SideBar>
        <img src={sideBarLogo} alt='logo' />
      </S.SideBar>
      <S.LoginPageContent>
        <S.Form data-testid='login-form' onSubmit={setUser}>
          <S.FormHeader>
            <S.FormName>Войти</S.FormName>
          </S.FormHeader>
          <S.FormInner>
            <S.FormColumn>
              <S.FormRow>
                <S.FormItem>
                  <S.FormLabel htmlFor='email'>Email</S.FormLabel>
                  <S.FormInput
                    name='email'
                    id='email'
                    type='text'
                    data-testid='email'
                  />
                </S.FormItem>
              </S.FormRow>
              <S.FormRow>
                <S.FormItem>
                  <S.FormLabel htmlFor='password'>Пароль</S.FormLabel>
                  <S.FormInput
                    name='password'
                    id='password'
                    type='text'
                    data-testid='password'
                  />
                </S.FormItem>
              </S.FormRow>
            </S.FormColumn>
          </S.FormInner>
          <S.FormSubmit type='submit' data-testid='login-btn'>
            Войти
          </S.FormSubmit>
          <span>
            Новый пользователь?{' '}
            <Link to='/reg'>
              <S.Button
                type='button'
                onClick={() => changeState('reg')}
                data-testid='new-user-btn'
              >
                Регистрация
              </S.Button>
            </Link>
          </span>
        </S.Form>
      </S.LoginPageContent>
    </S.Page>
  );
};

LoginPage.propTypes = {
  isLoggedIn: PropTypes.bool,
  logIn: PropTypes.func,
  logOut: PropTypes.func,
  changeState: PropTypes.func,
};
