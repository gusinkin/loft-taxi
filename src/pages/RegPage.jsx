import { React, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { setPage } from '../redux/ui/actions';
import { logged } from '../redux/ui/selector';
import sideBarLogo from '../svg/sidebar.svg';
import '../styles/Form.css';

export const RegPage = () => {
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
      navigate('/map');
      changeState('map');
    }
  }, [loggedIn, navigate, changeState]);

  return (
    <div className='formPage' data-testid='registration-page'>
      {' '}
      <div className='sideBar'>
        <img src={sideBarLogo} className='logo' alt='logo' />
      </div>
      <div className='formPageContent'>
        <div className='formWrapper'>
          <div className='formHeader'>
            <h2 className='formName'>Регистрация</h2>
          </div>
          <form>
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
                  <label htmlFor='userName'>Как Вас зовут?*</label>
                  <input
                    className='formInput'
                    name='userName'
                    id='userName'
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
                  className='navButton'
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
