import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user/reducer';
import { uiReducer } from './ui/reducer';
import { paymentReducer } from './payment/reducer';
import { rootSaga } from './sagas/rootSaga';

export const rootReducers = combineReducers({
  ui: uiReducer,
  user: userReducer,
  payment: paymentReducer,
});

export const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
