import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { authenticate } from '../actions';
import '../styles/Form.css';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
  authenticate = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    this.props.authenticate(email.value, password.value);
    // this.setProfilePage();
  };

  // setProfilePage = () => {
  //   const { setPage } = this.props;
  //   setPage('profile');
  // };

  // setRegPage = () => {
  //   const { setPage } = this.props;
  //   setPage('reg');
  // };

  render() {
    return (
      <>
        {this.props.isLoggedIn ? (
          <p>
            You are logged in. <Link to='/profile'>Go to profile</Link>
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
                {/* <button className='navButton' onClick={this.setRegPage}>
                  Регистрация
                </button> */}
                <Link to='/reg' className='navButton'>
                  Регистрация
                </Link>
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

export const LoginPageWithAuth = connect(
  (state) => ({ isLoggedIn: state.auth.isLoggedIn }),
  { authenticate }
)(LoginPage);
