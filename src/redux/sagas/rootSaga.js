import { all, fork } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { regSaga } from './regSaga';
import { updateCardSaga, getCardSaga } from './paymentSaga';
import { addressListSaga } from './addressListSaga';

export function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(regSaga),
    fork(updateCardSaga),
    fork(getCardSaga),
    fork(addressListSaga),
  ]);
}
