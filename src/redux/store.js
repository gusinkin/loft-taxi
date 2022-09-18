import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { userReducer } from './user/reducer';
import { uiReducer } from './ui/reducer';
import { rootSaga } from './sagas/rootSaga';

export const rootReducers = combineReducers({
  ui: uiReducer,
  user: userReducer,
});

export const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
