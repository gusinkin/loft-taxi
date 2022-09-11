import { configureStore } from '@reduxjs/toolkit';
import { authMiddleware } from './ui/authMiddleware';

import { combineReducers } from 'redux';
import { uiReducer } from './ui/reducer';

const rootReducers = combineReducers({ ui: uiReducer });

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});
