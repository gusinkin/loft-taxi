import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logOut } from '../actions';

class ProfilePage extends Component {
  unauthenticate = () => {
    this.props.logOut();
    // this.props.setPage('login');
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

export const ProfilePageWithAuth = connect(null, { logOut })(ProfilePage);
