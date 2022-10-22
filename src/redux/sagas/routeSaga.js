import { takeEvery, call, put } from 'redux-saga/effects';
import { getRoute, setRoute } from '../order/actions';
import { getRouteRequest } from '../requests/getRouteRequest';

function* getRouteSaga(action) {
  const data = action.payload;
  const success = yield call(getRouteRequest, data);

  if (success) {
    yield put(setRoute(success));
  }
}

export function* routeSaga() {
  yield takeEvery(getRoute, getRouteSaga);
}
