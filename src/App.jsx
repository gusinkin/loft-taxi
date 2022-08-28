import React, { Component } from 'react';
import { withAuth } from './AuthContext';
import { Header } from './Header';
import { LoginPageWithAuth } from './pages/LoginPage';
import { MapPage } from './pages/MapPage';
import { ProfilePageWithAuth } from './pages/ProfilePage';
import { RegPage } from './pages/RegPage';
import PropTypes from 'prop-types';

const PAGES = {
  login: (props) => <LoginPageWithAuth {...props} />,
  map: (props) => <MapPage {...props} />,
  profile: (props) => <ProfilePageWithAuth {...props} />,
  reg: (props) => <RegPage {...props} />,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 'login' };
  }

  setPage = (pageName) => {
    if (this.props.isLoggedIn || pageName === 'reg') {
      this.setState({ page: pageName });
    } else {
      this.setState({ page: 'login' });
    }
  };

  render() {
    return (
      <div className='App'>
        <Header setPage={this.setPage} />
        <section>{PAGES[this.state.page]({ setPage: this.setPage })}</section>
      </div>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default withAuth(App);
