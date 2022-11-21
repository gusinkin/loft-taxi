import { React, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { setPage, setLoading } from '../redux/ui/actions';
import { register } from '../redux/user/actions';
import { logged } from '../redux/user/selector';
import { loading } from '../redux/ui/selector';
import sideBarLogo from '../svg/sidebar.svg';
import loadingAnim from '../images/loading.gif';
import '../styles/Form.css';

export const RegPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector(logged);
  const isLoading = useSelector(loading);

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

  const registrate = (event) => {
    event.preventDefault();
    dispatch(setLoading(true));

    const { email, password, name, surname } = event.target;

    const payload = {
      email: email.value,
      password: password.value,
      name: name.value,
      surname: surname.value,
    };

    dispatch(register(payload));
  };

  if (isLoading) {
    return (
      <div className='formPage loading' data-testid='registration-page'>
        <div className='animation'>
          <img className='anim' src={loadingAnim} alt='loading' />
        </div>
        <div className='sideBar'>
          <img src={sideBarLogo} className='logo' alt='logo' />
        </div>
        <div className='formPageContent'>
          <div className='formWrapper'>
            <div className='formHeader'>
              <h2 className='formName'>Регистрация</h2>
            </div>
            <form onSubmit={registrate}>
              <div className='formColumn'>
                <div className='formRow'>
                  <div className='formItem'>
                    <label htmlFor='email'>Email*</label>
                    <input
                      className='formInput'
                      name='email'
                      id='email'
                      type='text'
                    />
                  </div>
                </div>
                <div className='formRow'>
                  <div className='formItem'>
                    <label htmlFor='name'>Как Вас зовут?*</label>
                    <input
                      className='formInput'
                      name='name'
                      id='name'
                      type='text'
                    />
                  </div>
                </div>
                <div className='formRow'>
                  <div className='formItem'>
                    <label htmlFor='surname'>Ваша фамилия*</label>
                    <input
                      className='formInput'
                      name='surname'
                      id='surname'
                      type='text'
                    />
                  </div>
                </div>
                <div className='formRow'>
                  <div className='formItem'>
                    <label htmlFor='password'>Придумайте пароль*</label>
                    <input
                      className='formInput'
                      name='password'
                      id='password'
                      type='text'
                    />
                  </div>
                </div>
                <button className='formSubmit' type='submit'>
                  Зарегистрироваться
                </button>
              </div>
            </form>
            <div>
              <span className='formSpan'>
                Уже зарегистрированы?{' '}
                <Link to='/'>
                  <button
                    className='button'
                    type='button'
                    onClick={() => changeState('login')}
                  >
                    Войти
                  </button>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='formPage' data-testid='registration-page'>
      <div className='sideBar'>
        <img src={sideBarLogo} className='logo' alt='logo' />
      </div>
      <div className='formPageContent'>
        <div className='formWrapper'>
          <div className='formHeader'>
            <h2 className='formName'>Регистрация</h2>
          </div>
          <form onSubmit={registrate}>
            <div className='formColumn'>
              <div className='formRow'>
                <div className='formItem'>
                  <label htmlFor='email'>Email*</label>
                  <input
                    className='formInput'
                    name='email'
                    id='email'
                    type='text'
                  />
                </div>
              </div>
              <div className='formRow'>
                <div className='formItem'>
                  <label htmlFor='name'>Как Вас зовут?*</label>
                  <input
                    className='formInput'
                    name='name'
                    id='name'
                    type='text'
                  />
                </div>
              </div>
              <div className='formRow'>
                <div className='formItem'>
                  <label htmlFor='surname'>Ваша фамилия*</label>
                  <input
                    className='formInput'
                    name='surname'
                    id='surname'
                    type='text'
                  />
                </div>
              </div>
              <div className='formRow'>
                <div className='formItem'>
                  <label htmlFor='password'>Придумайте пароль*</label>
                  <input
                    className='formInput'
                    name='password'
                    id='password'
                    type='text'
                  />
                </div>
              </div>
              <button className='formSubmit' type='submit'>
                Зарегистрироваться
              </button>
            </div>
          </form>
          <div>
            <span className='formSpan'>
              Уже зарегистрированы?{' '}
              <Link to='/'>
                <button
                  className='button'
                  type='button'
                  onClick={() => changeState('login')}
                >
                  Войти
                </button>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

RegPage.propTypes = {
  isLoggedIn: PropTypes.bool,
  logIn: PropTypes.func,
  logOut: PropTypes.func,
  changeState: PropTypes.func,
};
