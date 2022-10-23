import { takeEvery, call, put } from 'redux-saga/effects';
import { getRoute, setRoute } from '../order/actions';
import { getRouteRequest } from '../requests/getRouteRequest';

function* getRouteSaga(action) {
  const data = action.payload;
  const response = yield call(getRouteRequest, data);

  if (response) {
    yield put(setRoute(response));
  }
}

export function* routeSaga() {
  yield takeEvery(getRoute, getRouteSaga);
}
