import React, { Component } from 'react';
import { withAuth } from '../AuthContext';
import PropTypes from 'prop-types';

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
          <>
            <form onSubmit={this.authenticate}>
              <label>
                Email:
                <input name='email' type='text' />
              </label>
              <label>
                Пароль:
                <input name='password' type='password' />
              </label>
              <input type='submit' value='Submit' />
            </form>
            <span>Новый пользователь?</span>
            <button onClick={this.setRegPage}>Регистрация</button>
          </>
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
