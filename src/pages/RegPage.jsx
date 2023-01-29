import { React, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { setPage, setLoading } from '../redux/store/ui/actions';
import { reg } from '../redux/store/user/actions';
import { logged } from '../redux/store/user/selector';
import { loading } from '../redux/store/ui/selector';
import sideBarLogo from '../svg/sidebar.svg';
import loadingAnim from '../images/loading.gif';
import TextField from '@mui/material/TextField';
import { Page, Spinner, SideBar, LoginPageContent, Button } from './LoginPage';
import * as S from '../components/FormStyles';

export const RegPage = () => {
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

  const registrate = (data) => {
    dispatch(reg(data));
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
    <Page loading={isLoading ? 1 : 0} data-testid='registration-page'>
      <Spinner loading={isLoading ? 1 : 0}>
        <img src={loadingAnim} alt='loading' />
      </Spinner>
      <SideBar>
        <img src={sideBarLogo} alt='logo' />
      </SideBar>
      <LoginPageContent>
        <S.Form onSubmit={handleSubmit(registrate)}>
          <S.FormHeader>
            <S.FormName>Регистрация</S.FormName>
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
                label='Ваше имя'
                type='text'
                id='name'
                placeholder='Александр'
                error={errors.name ? true : false}
                helperText={errors.name ? errors.name.message : ' '}
                {...register('name', {
                  required: 'Введите имя',
                })}
              ></TextField>
            </S.FormRow>
            <S.FormRow>
              <TextField
                fullWidth
                variant='standard'
                label='Ваша фамилия'
                type='text'
                id='surname'
                placeholder='Пушкин'
                error={errors.surname ? true : false}
                helperText={errors.surname ? errors.surname.message : ' '}
                {...register('surname', {
                  required: 'Введите фамилию',
                })}
              ></TextField>
            </S.FormRow>
            <S.FormRow>
              <TextField
                fullWidth
                variant='standard'
                label='Придумайте пароль'
                type='password'
                id='password'
                placeholder='********'
                error={errors.password ? true : false}
                helperText={errors.password ? errors.password.message : ' '}
                {...register('password', {
                  required: 'Введите пароль',
                  minLength: {
                    value: 8,
                    message: 'Минимум 8 символов',
                  },
                })}
              ></TextField>
            </S.FormRow>
          </S.FormColumn>
          <S.FormSubmit login={true} type='submit'>
            Зарегистрироваться
          </S.FormSubmit>
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
