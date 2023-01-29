import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user/reducer';
import { uiReducer } from './ui/reducer';
import { paymentReducer } from './payment/reducer';
import { rootSaga } from '../sagas/rootSaga';
import { orderReducer } from './order/reducer';
import { loadState, saveState } from '../../LocalStorage';

export const rootReducers = combineReducers({
  ui: uiReducer,
  user: userReducer,
  payment: paymentReducer,
  order: orderReducer,
});

const persistedState = loadState();

export const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducers,
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  saveState({
    ui: store.getState().ui,
    user: store.getState().user,
    payment: store.getState().payment,
  });
});
