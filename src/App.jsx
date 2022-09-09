import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux/';
import PropTypes from 'prop-types';
import { LoginPageWithAuth } from './pages/LoginPage';
import { MapPage } from './pages/MapPage';
import { ProfilePageWithAuth } from './pages/ProfilePage';
import { RegPage } from './pages/RegPage';
import headerLogo from './svg/header.svg';
import sideBarLogo from './svg/sidebar.svg';
import './styles/App.css';
import { Link, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { selectPage } from './redux/ui/selector';
import { setPage } from './redux/ui/action';

const PAGES = {
  login: LoginPageWithAuth,
  map: MapPage,
  profile: ProfilePageWithAuth,
  reg: RegPage,
};

const App = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);

  const CurrentPage = PAGES[page];

  const changePage = (pageName) => {
    dispatch(setPage(pageName));
  };
  return (
    <>
      {/* {this.state.page === 'login' || this.state.page === 'reg' ? (
    <div className='app appWithSideBar'>
      <div className='sideBar'>
        <img src={sideBarLogo} className='logo' alt='logo' />
      </div>
      <section>
        {PAGES[this.state.page]({ setPage: this.setPage })}
      </section>
    </div>
  ) : ( */}
      <div className='app'>
        <header>
          <img src={headerLogo} className='headerLogo' alt='logo' />
          <nav>
            <ul>
              <li>
                <Link to='/map'>Карта</Link>
              </li>
              <li>
                <Link to='/profile'>Профиль</Link>
              </li>
              <li>
                <Link to='/'>Логин</Link>
              </li>
            </ul>
          </nav>
        </header>
        <section>
          <Routes>
            <Route index element={<LoginPageWithAuth />} />
            <Route path='/reg' element={<RegPage />} />
            <Route path='/map' element={<MapPage />} />
            <Route path='/profile' element={<ProfilePageWithAuth />} />
          </Routes>
          {/* <CurrentPage setPage={changePage} /> */}
        </section>
      </div>
      {/* )} */}
    </>
  );
};

App.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default App;
