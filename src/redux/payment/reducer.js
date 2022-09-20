import { createReducer } from '@reduxjs/toolkit';
import { logOut } from '../user/actions';
import { saveCard } from './actions';

const initialState = {
  cardLinked: false,
  userCard: {
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  },
};

export const paymentReducer = createReducer(initialState, {
  [saveCard.type]: (store, action) => {
    store.cardLinked = true;
    store.userCard.cardName = action.payload.cardName;
    store.userCard.cardNumber = action.payload.cardNumber;
    store.userCard.expiryDate = action.payload.expiryDate;
    store.userCard.cvc = action.payload.cvc;
  },

  [logOut.type]: (store) => {
    store.cardLinked = false;
    store.userCard.cardName = '';
    store.userCard.cardNumber = '';
    store.userCard.expiryDate = '';
    store.userCard.cvc = '';
  },
});
