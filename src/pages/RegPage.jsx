import React, { Component } from 'react';
import '../styles/Form.css';

export class RegPage extends Component {
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
      <div className='formWrapper'>
        <h2 className='formName'>Регистрация</h2>
        <form onSubmit={this.handleSubmit}>
          <div className='formRow'>
            <label htmlFor='email'>Email*</label>
            <input className='formInput' name='email' id='email' type='text' />
          </div>
          <div className='formRow'>
            <label htmlFor='userName'>Как Вас зовут?*</label>
            <input
              className='formInput'
              name='userName'
              id='userName'
              type='text'
            />
          </div>
          <div className='formRow'>
            <label htmlFor='password'>Придумайте пароль*</label>
            <input
              className='formInput'
              name='password'
              id='password'
              type='text'
            />
          </div>

          <button className='formSubmit' type='submit'>
            Зарегистрироваться
          </button>
        </form>
        <div>
          <span className='formSpan'>
            Уже зарегистрированы?{' '}
            <button className='navButton' onClick={() => setPage('login')}>
              Войти
            </button>
          </span>
        </div>
      </div>
    );
  }
}
