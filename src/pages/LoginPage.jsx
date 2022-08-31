import React, { Component } from 'react';
import { withAuth } from '../AuthContext';
import PropTypes from 'prop-types';
import '../styles/Form.css';

class LoginPage extends Component {
  authenticate = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    this.props.logIn(email.value, password.value);
    this.setProfilePage();
  };

  setProfilePage = () => {
    const { setPage } = this.props;
    setPage('profile');
  };

  setRegPage = () => {
    const { setPage } = this.props;
    setPage('reg');
  };

  render() {
    return (
      <>
        {this.props.isLoggedIn ? (
          <p>
            You are logged in
            <button onClick={this.setProfilePage}>go to profile</button>
          </p>
        ) : (
          <div className='formWrapper'>
            <h2 className='formName'>Войти</h2>
            <form onSubmit={this.authenticate}>
              <div className='formRow'>
                <label htmlFor='email'>Email</label>
                <input
                  className='formInput'
                  name='email'
                  id='email'
                  type='text'
                />
              </div>
              <div className='formRow'>
                <label htmlFor='password'>Пароль</label>
                <input
                  className='formInput'
                  name='password'
                  id='password'
                  type='text'
                />
              </div>
              <button className='formSubmit' type='submit'>
                Войти
              </button>
            </form>
            <div>
              {' '}
              <span className='formSpan'>
                Новый пользователь?{' '}
                <button className='navButton' onClick={this.setRegPage}>
                  Регистрация
                </button>
              </span>
            </div>
          </div>
        )}
      </>
    );
  }
}

LoginPage.propTypes = {
  logIn: PropTypes.func,
  isLoggedIn: PropTypes.bool,
};

export const LoginPageWithAuth = withAuth(LoginPage);
