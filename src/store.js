import rootReducer from './reducers';
import { configureStore } from '@reduxjs/toolkit';
// import { createStore, applyMiddleware } from 'redux';
import { authMiddleware } from './authMiddleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});

// export const store = createStore(rootReducer, applyMiddleware(authMiddleware));
