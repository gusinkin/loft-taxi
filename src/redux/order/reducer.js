import { createReducer } from '@reduxjs/toolkit';
import { saveAddressList } from './actions';
import { logOut } from '../user/actions';

const initialState = {
  addressList: [],
};

export const orderReducer = createReducer(initialState, {
  [saveAddressList.type]: (store, action) => {
    store.addressList = action.payload.addresses;
  },

  [logOut.type]: (store) => {
    store.addressList = [];
  },
});
