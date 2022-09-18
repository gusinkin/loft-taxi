import { takeEvery, call, put } from 'redux-saga/effects';
import { register, logIn, logOut } from '../user/actions';
import { regRequest } from '../requests/regRequest';

export function* registrationSaga(action) {
  const email = action.payload.email;
  const password = action.payload.password;
  const name = action.payload.name;
  const surname = action.payload.surname;
  const response = yield call(regRequest, email, password, name, surname);
  if (response.success) {
    yield put(
      logIn({ email, password, name, surname, authToken: response.token })
    );
  } else {
    yield put(logOut());
  }
}

export function* regSaga() {
  yield takeEvery(register, registrationSaga);
}
