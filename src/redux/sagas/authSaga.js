import { takeEvery, call, put } from 'redux-saga/effects';
import { authenticate, logIn, logOut } from '../user/actions';
import { authRequest } from '../requests/authRequest';

export function* authenticateSaga(action) {
  const email = action.payload.payloadEmail;
  const password = action.payload.payloadPassword;
  const success = yield call(authRequest, email, password);
  if (success) {
    yield put(logIn({ email, password }));
  } else {
    yield put(logOut());
  }
}

export function* authSaga() {
  yield takeEvery(authenticate, authenticateSaga);
}
