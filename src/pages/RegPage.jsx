import { React, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { setPage, setLoading } from '../redux/store/ui/actions';
import { register } from '../redux/store/user/actions';
import { logged } from '../redux/store/user/selector';
import { loading } from '../redux/store/ui/selector';
import sideBarLogo from '../svg/sidebar.svg';
import loadingAnim from '../images/loading.gif';
import { Page, Spinner, SideBar, LoginPageContent, Button } from './LoginPage';
import * as S from '../components/FormStyles';

export const RegPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector(logged);
  const isLoading = useSelector(loading);

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(false));
    }
  }, []);

  const registrate = (event) => {
    event.preventDefault();

    const { email, password, name, surname } = event.target;

    const payload = {
      email: email.value,
      password: password.value,
      name: name.value,
      surname: surname.value,
    };

    dispatch(register(payload));
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
    <Page loading={isLoading} data-testid='registration-page'>
      <Spinner loading={isLoading}>
        <img src={loadingAnim} alt='loading' />
      </Spinner>
      <SideBar>
        <img src={sideBarLogo} alt='logo' />
      </SideBar>
      <LoginPageContent>
        <S.Form onSubmit={registrate}>
          <S.FormHeader>
            <S.FormName>Регистрация</S.FormName>
          </S.FormHeader>
          <S.FormColumn>
            <S.FormRow>
              <S.FormItem>
                <S.FormLabel htmlFor='email'>Email*</S.FormLabel>
                <S.FormInput name='email' id='email' type='text' />
              </S.FormItem>
            </S.FormRow>
            <S.FormRow>
              <S.FormItem>
                <S.FormLabel htmlFor='name'>Как Вас зовут?*</S.FormLabel>
                <S.FormInput name='name' id='name' type='text' />
              </S.FormItem>
            </S.FormRow>
            <S.FormRow>
              <S.FormItem>
                <S.FormLabel htmlFor='name'>Ваша фамилия*</S.FormLabel>
                <S.FormInput name='surname' id='surname' type='text' />
              </S.FormItem>
            </S.FormRow>
            <S.FormRow>
              <S.FormItem>
                <S.FormLabel htmlFor='password'>Придумайте пароль*</S.FormLabel>
                <S.FormInput name='password' id='password' type='text' />
              </S.FormItem>
            </S.FormRow>
          </S.FormColumn>
          <S.FormSubmit type='submit'>Зарегистрироваться</S.FormSubmit>
          <span>
            Уже зарегистрированы?{' '}
            <Link to='/'>
              <Button type='button' onClick={() => changeState('login')}>
                Войти
              </Button>
            </Link>
          </span>
        </S.Form>
      </LoginPageContent>
    </Page>
  );
};

RegPage.propTypes = {
  isLoggedIn: PropTypes.bool,
  logIn: PropTypes.func,
  logOut: PropTypes.func,
  changeState: PropTypes.func,
};
