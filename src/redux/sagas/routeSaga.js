import { takeEvery, call, put } from 'redux-saga/effects';
import { getRoute, setRoute } from '../store/order/actions';
import { getRouteRequest } from '../requests/getRouteRequest';

function* getRouteSaga(action) {
  const data = action.payload;
  const response = yield call(getRouteRequest, data);

  if (response) {
    yield put(setRoute(response));
  } else {
    alert('Не удалось получить маршрут с сервера');
  }
}

export function* routeSaga() {
  yield takeEvery(getRoute, getRouteSaga);
}
