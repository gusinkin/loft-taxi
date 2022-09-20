import { takeEvery, call, put } from 'redux-saga/effects';
import { getAddressList, saveAddressList } from '../order/actions';
import { getAddressListRequest } from '../requests/getAddressRequest';

function* getAddressListSaga(action) {
  const data = action.payload;
  const success = yield call(getAddressListRequest, data);

  if (success) {
    // console.log('data received');
    // console.log(success);
    yield put(saveAddressList(success));
    // yield console.log(success);
  }
}

export function* addressListSaga() {
  yield takeEvery(getAddressList, getAddressListSaga);
}
