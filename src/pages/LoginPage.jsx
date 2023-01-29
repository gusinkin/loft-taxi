import { React, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { setPage, setLoading } from '../redux/store/ui/actions';
import { authenticate } from '../redux/store/user/actions';
import { logged } from '../redux/store/user/selector';
import { loading } from '../redux/store/ui/selector';
import sideBarLogo from '../svg/sidebar.svg';
import loadingAnim from '../images/loading.gif';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import * as S from '../components/FormStyles';

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector(logged);
  const isLoading = useSelector(loading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(false));
    }
  }, []);

  const setUser = (data) => {
    dispatch(authenticate(data));
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
    <Page loading={isLoading ? 1 : 0} data-testid='login-page'>
      <Spinner loading={isLoading ? 1 : 0}>
        <img src={loadingAnim} alt='loading' />
      </Spinner>
      <SideBar>
        <img src={sideBarLogo} alt='logo' />
      </SideBar>
      <LoginPageContent>
        <S.Form data-testid='login-form' onSubmit={handleSubmit(setUser)}>
          <S.FormHeader>
            <S.FormName>Войти</S.FormName>
          </S.FormHeader>
          <S.FormColumn>
            <S.FormRow>
              <TextField
                fullWidth
                variant='standard'
                label='Email'
                type='email'
                id='email'
                placeholder='mail@mail.ru'
                error={errors.email ? true : false}
                helperText={errors.email ? errors.email.message : ' '}
                {...register('email', {
                  required: 'Введите email',
                })}
              ></TextField>
            </S.FormRow>
            <S.FormRow>
              <TextField
                fullWidth
                variant='standard'
                label='Пароль'
                type='password'
                id='password'
                placeholder='********'
                error={errors.password ? true : false}
                helperText={errors.password ? errors.password.message : ' '}
                {...register('password', {
                  required: 'Введите пароль',
                })}
              ></TextField>
            </S.FormRow>
          </S.FormColumn>
          <S.FormSubmit login={true} type='submit' data-testid='login-btn'>
            Войти
          </S.FormSubmit>
          <span>
            Новый пользователь?{' '}
            <Link to='/reg'>
              <Button
                type='button'
                onClick={() => changeState('reg')}
                data-testid='new-user-btn'
              >
                Регистрация
              </Button>
            </Link>
          </span>
        </S.Form>
      </LoginPageContent>
    </Page>
  );
};

export const Page = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  @media (max-width: 800px) {
    flex-direction: column;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: ${({ loading }) => (loading ? 'block' : 'none')};
  }
`;

export const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  display: ${({ loading }) => (loading ? 'block' : 'none')};
`;

export const SideBar = styled.div`
  background-color: #1c1a19;
  width: 34%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    width: 100%;
    height: 20%;
  }
`;

export const LoginPageContent = styled.div`
  width: 66%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    width: 100%;
    height: 80%;
    background: #fff;
  }
`;

export const Button = styled.button`
  background: transparent;
  border: none;
  color: #fdbf5a;
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
`;
