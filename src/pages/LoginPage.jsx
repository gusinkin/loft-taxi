import React, { Component } from 'react';
import { withAuth } from '../AuthContext';

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

  render() {
    const { setPage } = this.props;

    return (
      <>
        {this.props.isLoggedIn ? (
          <p>
            You are logged in{' '}
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
                <input name='password' type='text' />
              </label>
              <input type='submit' value='Submit' />
            </form>
            <span>Новый пользователь?</span>
            <button onClick={() => setPage('reg')}>Регистрация</button>
          </>
        )}
      </>
    );
  }
}

export const LoginPageWithAuth = withAuth(LoginPage);
