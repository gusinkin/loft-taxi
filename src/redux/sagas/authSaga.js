import { takeEvery, call, put } from 'redux-saga/effects';
import { authenticate, logIn, logOut } from '../user/actions';
import { authRequest } from '../requests/authRequest';
import { getCard } from '../payment/actions';
import { getAddressList } from '../order/actions';

export function* authenticateSaga(action) {
  const email = action.payload.email;
  const password = action.payload.password;
  const response = yield call(authRequest, email, password);
  if (response.success === true) {
    yield put(logIn({ email, password, authToken: email }));
    /* authToken: email - потому что так работает сервер, сохраняемые данные карты 
    привязываются почему-то к токену, независимо от аккаунта. 
    А если токен брать из ответа на запрос на авторизацию, то он каждый раз будет новым.
    Поэтому беру за токен email, чтобы можно было сохранить данные карты и привязать к аккаунту */
    yield put(getCard(email));
    yield put(getAddressList());
  } else if (response.success === false) {
    alert('Ошибка авторизации');
    yield put(logOut());
  } else {
    yield put(logOut());
  }
}

export function* authSaga() {
  yield takeEvery(authenticate, authenticateSaga);
}
