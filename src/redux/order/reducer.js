import { createReducer } from '@reduxjs/toolkit';
import { saveAddressList, placeOrder } from './actions';
import { logOut } from '../user/actions';

const initialState = {
  addressList: [],
  orderPlaced: false,
};

export const orderReducer = createReducer(initialState, {
  [saveAddressList.type]: (store, action) => {
    store.addressList = action.payload.addresses;
  },

  [placeOrder.type]: (store, action) => {
    store.orderPlaced = action.payload;
  },

  [logOut.type]: (store) => {
    store.addressList = [];
  },
});
