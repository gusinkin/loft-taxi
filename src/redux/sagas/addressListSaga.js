import { takeEvery, call, put } from 'redux-saga/effects';
import { getAddressList, saveAddressList } from '../order/actions';
import { getAddressListRequest } from '../requests/getAddressRequest';

function* getAddressListSaga(action) {
  const data = action.payload;
  const success = yield call(getAddressListRequest, data);

  if (success) {
    yield put(saveAddressList(success));
  }
}

export function* addressListSaga() {
  yield takeEvery(getAddressList, getAddressListSaga);
}
