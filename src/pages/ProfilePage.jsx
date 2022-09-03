import React, { Component } from 'react';
import { withAuth } from '../AuthContext';
import PropTypes from 'prop-types';

class ProfilePage extends Component {
  unauthenticate = () => {
    this.props.logOut();
    this.props.setPage('login');
  };

  render() {
    return (
      <div>
        <h1>Profile page</h1>
        <button onClick={this.unauthenticate}>Log out</button>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  logOut: PropTypes.func,
  setPage: PropTypes.func,
};

export const ProfilePageWithAuth = withAuth(ProfilePage);
