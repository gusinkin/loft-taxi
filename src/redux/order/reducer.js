import { createReducer } from '@reduxjs/toolkit';
import { saveAddressList, placeOrder, setRoute } from './actions';
import { logOut } from '../user/actions';

const initialState = {
  addressList: [],
  orderPlaced: false,
  coords: [],
};

export const orderReducer = createReducer(initialState, {
  [saveAddressList.type]: (store, action) => {
    store.addressList = action.payload.addresses;
  },

  [placeOrder.type]: (store, action) => {
    store.orderPlaced = action.payload;
  },

  [setRoute.type]: (store, action) => {
    store.coords = action.payload;
  },

  [logOut.type]: (store) => {
    store.addressList = [];
  },
});
