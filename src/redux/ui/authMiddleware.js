import { logIn, authenticate } from './actions';
import { serverLogin } from './api';

export const authMiddleware = (store) => (next) => async (action) => {
  if (action.type === authenticate.type) {
    const email = action.payload.payloadEmail;
    const password = action.payload.payloadPassword;
    const sucess = await serverLogin(email, password);
    const payload = {
      email,
      password,
    };
    if (sucess) {
      store.dispatch(logIn(payload));
    }
  } else {
    next(action);
  }
};
