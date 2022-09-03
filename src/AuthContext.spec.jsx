import React from 'react';
import { AuthProvider, AuthContext } from './AuthContext';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('AuthContext', () => {
  describe('logIn function', () => {
    it("sets 'isLoggedIn' to true", () => {
      let isLoggedIn;
      let logIn;

      render(
        <AuthProvider>
          <AuthContext.Consumer>
            {(value) => {
              isLoggedIn = value.isLoggedIn;
              logIn = value.logIn;
              return null;
            }}
          </AuthContext.Consumer>
        </AuthProvider>
      );

      expect(isLoggedIn).toBe(false);
      act(() => {
        logIn('test@test.com', '123123');
      });
      expect(isLoggedIn).toBe(true);
    });
  });

  describe('logOut function', () => {
    it("sets 'isLoggedIn' to false", () => {
      let isLoggedIn;
      let logIn;
      let logOut;

      render(
        <AuthProvider>
          <AuthContext.Consumer>
            {(value) => {
              logOut = value.logOut;
              logIn = value.logIn;
              isLoggedIn = value.isLoggedIn;
              return null;
            }}
          </AuthContext.Consumer>
        </AuthProvider>
      );

      act(() => {
        logIn('test@test.com', '123123');
        logOut();
      });

      expect(isLoggedIn).toBe(false);
    });
  });
});
