import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducers } from '../redux/store';
import { authMiddleware } from '../redux/middlewares/authMiddleware';
import { regMiddleware } from '../redux/middlewares/regMiddleware';

export const customRender = (component, state) => {
  const store = configureStore({
    reducer: rootReducers,
    preloadedState: state,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authMiddleware).concat(regMiddleware),
  });

  return {
    ...render(
      <BrowserRouter>
        <Provider store={store}>{component}</Provider>
      </BrowserRouter>
    ),
    store,
  };
};
