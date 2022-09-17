import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { authMiddleware } from './middlewares/authMiddleware';
import { regMiddleware } from './middlewares/regMiddleware';
import { userReducer } from './user/reducer';
import { uiReducer } from './ui/reducer';

export const rootReducers = combineReducers({
  ui: uiReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware).concat(regMiddleware),
});
