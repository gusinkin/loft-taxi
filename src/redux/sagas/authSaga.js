import { takeEvery, call, put } from 'redux-saga/effects';
import { authenticate, logIn, logOut } from '../user/actions';
import { authRequest } from '../requests/authRequest';
import { getCard } from '../payment/actions';
import { getAddressList } from '../order/actions';

export function* authenticateSaga(action) {
  const email = action.payload.email;
  const password = action.payload.password;
  const response = yield call(authRequest, email, password);
  if (response.success) {
    yield put(logIn({ email, password, authToken: response.token }));
    yield put(getCard());
    yield put(getAddressList());
  } else {
    yield put(logOut());
  }
}

export function* authSaga() {
  yield takeEvery(authenticate, authenticateSaga);
}
