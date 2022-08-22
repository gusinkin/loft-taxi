import React, { Component } from 'react';

class RegPage extends Component {
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
        <h1>Registration page</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input name='email' type='text' />
          </label>
          <label>
            Как Вас зовут?:
            <input name='userName' type='text' />
          </label>
          <label>
            Придумайте пароль:
            <input name='password' type='text' />
          </label>
          <input type='submit' value='Submit' />
        </form>
        <div>
          <span>Уже зарегистрированы?</span>
          <button onClick={() => setPage('login')}>Войти</button>
        </div>
      </div>
    );
  }
}

export default RegPage;
