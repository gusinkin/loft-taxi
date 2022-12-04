import { createReducer } from '@reduxjs/toolkit';
import { setLoading, setPage } from './actions';

const initialState = {
  page: 'login',
  loading: false,
};

export const uiReducer = createReducer(initialState, {
  [setPage.type]: (store, action) => {
    store.page = action.payload;
  },
  [setLoading.type]: (store, action) => {
    store.loading = action.payload;
  },
});
