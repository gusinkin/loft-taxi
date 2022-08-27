import React, { Component } from 'react';
import Header from './Header';
import LoginPage from './pages/LoginPage';
import { MapPage } from './pages/MapPage';
import ProfilePage from './pages/ProfilePage';
import RegPage from './pages/RegPage';

const PAGES = {
  login: LoginPage,
  map: MapPage,
  profile: ProfilePage,
  reg: RegPage,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 'login' };
  }

  setPage = (pageName) => {
    this.setState({ page: pageName });
  };

  render() {
    const { page } = this.state;
    const CurrentPage = PAGES[page];

    return (
      <div className='App'>
        <Header setPage={this.setPage} />
        <CurrentPage setPage={this.setPage} />
      </div>
    );
  }
}

export default App;
