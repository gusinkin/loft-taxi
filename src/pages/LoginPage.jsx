import { React, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setPage } from '../redux/ui/actions';
import { authenticate } from '../redux/user/actions';
import { logged } from '../redux/user/selector';
import '../styles/Form.css';
import sideBarLogo from '../svg/sidebar.svg';

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector(logged);

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
      navigate('/map');
      changeState('map');
    }
  }, [loggedIn, navigate, changeState]);

  return (
    <div className='formPage' data-testid='login-page'>
      <div className='sideBar'>
        <img src={sideBarLogo} className='logo' alt='logo' />
      </div>
      <div className='formPageContent'>
        <div className='formWrapper'>
          <div className='formHeader'>
            <h2 className='formName'>Войти</h2>
          </div>
          <form data-testid='login-form' onSubmit={setUser}>
            <div className='formColumn'>
              <div className='formRow'>
                <div className='formItem'>
                  <label htmlFor='email'>Email</label>
                  <input
                    className='formInput'
                    name='email'
                    id='email'
                    type='text'
                    data-testid='email'
                  />
                </div>
              </div>
              <div className='formRow'>
                <div className='formItem'>
                  <label htmlFor='password'>Пароль</label>
                  <input
                    className='formInput'
                    name='password'
                    id='password'
                    type='text'
                    data-testid='password'
                  />
                </div>
              </div>
              <button
                className='formSubmit'
                type='submit'
                data-testid='login-btn'
              >
                Войти
              </button>
            </div>
          </form>
          <div>
            {' '}
            <span className='formSpan'>
              Новый пользователь?{' '}
              <Link to='/reg'>
                <button
                  className='button'
                  type='button'
                  onClick={() => changeState('reg')}
                  data-testid='new-user-btn'
                >
                  Регистрация
                </button>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  isLoggedIn: PropTypes.bool,
  logIn: PropTypes.func,
  logOut: PropTypes.func,
  changeState: PropTypes.func,
};
