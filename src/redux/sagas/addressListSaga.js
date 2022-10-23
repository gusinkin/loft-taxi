import { takeEvery, call, put } from 'redux-saga/effects';
import { getAddressList, saveAddressList } from '../order/actions';
import { getAddressListRequest } from '../requests/getAddressRequest';

function* getAddressListSaga(action) {
  const data = action.payload;
  const response = yield call(getAddressListRequest, data);

  if (response) {
    yield put(saveAddressList(response));
  }
}

export function* addressListSaga() {
  yield takeEvery(getAddressList, getAddressListSaga);
}
