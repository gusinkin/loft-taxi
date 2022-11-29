import { takeEvery, call, put } from 'redux-saga/effects';
import { authenticate, logIn, logOut } from '../user/actions';
import { setLoading } from '../ui/actions';
import { authRequest } from '../requests/authRequest';
// import { getCard } from '../payment/actions';

export function* authenticateSaga(action) {
  yield put(setLoading(true));
  const email = action.payload.email;
  const password = action.payload.password;
  const response = yield call(authRequest, email, password);
  yield put(setLoading(false));
  if (response.success === true) {
    yield put(logIn({ email, password, authToken: email }));
    /* authToken: email - потому что так работает сервер, сохраняемые данные карты 
    привязываются почему-то к токену, независимо от аккаунта. 
    А если токен брать из ответа на запрос на авторизацию, то он каждый раз будет новым.
    Поэтому беру за токен email, чтобы можно было сохранить данные карты и привязать к аккаунту */
    // yield put(getCard(email));
  } else if (response.success === false) {
    yield put(logOut());
    setTimeout(() => alert('Ошибка авторизации'), 100);
  } else {
    yield put(logOut());
  }
}

export function* authSaga() {
  yield takeEvery(authenticate, authenticateSaga);
}
