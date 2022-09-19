import { createReducer } from '@reduxjs/toolkit';
import { logIn, logOut } from './actions';

const initialState = {
  isLoggedIn: false,
  data: {
    email: '',
    password: '',
    name: '',
    surname: '',
  },
};

export const userReducer = createReducer(initialState, {
  [logIn.type]: (store, action) => {
    store.isLoggedIn = true;
    store.data.email = action.payload.email;
    store.data.password = action.payload.password;
    store.data.name = action.payload.name;
    store.data.surname = action.payload.surname;
  },
  [logOut.type]: (store) => {
    store.isLoggedIn = false;
    store.data.email = '';
    store.data.password = '';
    store.data.name = '';
    store.data.surname = '';
  },
});
