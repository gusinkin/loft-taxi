import { createReducer } from '@reduxjs/toolkit';
import { setPage } from './actions';

const initialState = {
  page: 'login',
};

export const uiReducer = createReducer(initialState, {
  [setPage.type]: (store, action) => {
    store.page = action.payload;
  },
});
