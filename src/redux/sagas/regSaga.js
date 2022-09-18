import { takeEvery, call, put } from 'redux-saga/effects';
import { register, logIn, logOut } from '../user/actions';
import { regRequest } from '../requests/regRequest';

export function* registrationSaga(action) {
  const email = action.payload.payloadEmail;
  const password = action.payload.payloadPassword;
  const name = action.payload.payloadName;
  const surname = action.payload.payloadSurname;
  const success = yield call(regRequest, email, password, name, surname);
  if (success) {
    yield put(logIn({ email, password, name, surname }));
  } else {
    yield put(logOut());
  }
}

export function* regSaga() {
  yield takeEvery(register, registrationSaga);
}
