import { takeEvery, call, put } from 'redux-saga/effects';
import { register, logIn, logOut } from '../user/actions';
import { regRequest } from '../requests/regRequest';

export function* registrationSaga(action) {
  const email = action.payload.email;
  const password = action.payload.password;
  const name = action.payload.name;
  const surname = action.payload.surname;
  const response = yield call(regRequest, email, password, name, surname);
  if (response.success === true) {
    yield put(
      logIn({ email, password, name, surname, authToken: email })
      /* authToken: email - потому что так работает сервер, сохраняемые данные карты 
    привязываются почему-то к токену, независимо от аккаунта. 
    А если токен брать из ответа на запрос на авторизацию, то он каждый раз будет новым.
    Поэтому беру за токен email, чтобы можно было сохранить данные карты и привязать к аккаунту */
    );
  } else if (response.success === false) {
    alert('Ошибка регистрации');
    yield put(logOut());
  } else {
    yield put(logOut());
  }
}

export function* regSaga() {
  yield takeEvery(register, registrationSaga);
}
