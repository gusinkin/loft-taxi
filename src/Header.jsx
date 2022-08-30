import React, { Component } from 'react';
import logo from './svg/logo.svg';

class Header extends Component {
  render() {
    const { setPage } = this.props;

    return (
      <header>
        <img src={logo} className='logo' alt='logo' />
        <button onClick={() => setPage('map')}>Карта</button>
        <button onClick={() => setPage('profile')}>Профиль</button>
        <button onClick={() => setPage('login')}>Логин</button>
      </header>
    );
  }
}

export default Header;
