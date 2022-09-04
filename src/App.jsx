import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LoginPageWithAuth } from './pages/LoginPage';
import { MapPage } from './pages/MapPage';
import { ProfilePageWithAuth } from './pages/ProfilePage';
import { RegPage } from './pages/RegPage';
import headerLogo from './svg/header.svg';
import sideBarLogo from './svg/sidebar.svg';
import './styles/App.css';
import { Link, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

// const PAGES = {
//   login: (props) => <LoginPageWithAuth {...props} />,
//   map: (props) => <MapPage {...props} />,
//   profile: (props) => <ProfilePageWithAuth {...props} />,
//   reg: (props) => <RegPage {...props} />,
// };

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = { page: 'login' };
  // }

  // setPage = (pageName) => {
  //   if (this.props.isLoggedIn || pageName === 'reg') {
  //     this.setState({ page: pageName });
  //   } else {
  //     this.setState({ page: 'login' });
  //   }
  // };

  render() {
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
          {/* <header>
              <img src={headerLogo} className='headerLogo' alt='logo' />
              <button className='navButton' onClick={() => this.setPage('map')}>
                Карта
              </button>
              <button
                className='navButton'
                onClick={() => this.setPage('profile')}
              >
                Профиль
              </button>
              <button
                className='navButton'
                onClick={() => this.setPage('login')}
              >
                Логин
              </button>
            </header> */}
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
            {/* {PAGES[this.state.page]({ setPage: this.setPage })} */}
            <Switch>
              <Route path='/reg' component={RegPage} />
              <PrivateRoute path='/map' component={MapPage} />
              <PrivateRoute path='/profile' component={ProfilePageWithAuth} />
              <Route exact path='/' component={LoginPageWithAuth} />
            </Switch>
          </section>
        </div>
        {/* )} */}
      </>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default connect((state) => ({ isLoggedIn: state.auth.isLoggedIn }))(App);
