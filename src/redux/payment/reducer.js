import { createReducer } from '@reduxjs/toolkit';
import { saveCard } from './actions';

const initialState = {
  userCard: {
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  },
};

export const paymentReducer = createReducer(initialState, {
  [saveCard.type]: (store, action) => {
    store.userCard.cardName = action.payload.cardName;
    store.userCard.cardNumber = action.payload.cardNumber;
    store.userCard.expiryDate = action.payload.expiryDate;
    store.userCard.cvc = action.payload.cvc;
  },
});
