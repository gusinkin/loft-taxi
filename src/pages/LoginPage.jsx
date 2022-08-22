import React, { Component } from 'react';

class LoginPage extends Component {
  setMapPage = () => {
    const { setPage } = this.props;
    setPage('map');
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setMapPage();
  };

  render() {
    const { setPage } = this.props;

    return (
      <div>
        <h1>Login page</h1>
        <form onSubmit={this.handleSubmit}>
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
        <div>
          <span>Новый пользователь?</span>
          <button onClick={() => setPage('reg')}>Регистрация</button>
        </div>
      </div>
    );
  }
}

export default LoginPage;
