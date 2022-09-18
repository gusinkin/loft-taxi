import { takeEvery, call, put } from 'redux-saga/effects';
import { updateCard, getCard, saveCard } from '../payment/actions';
import { updateCardRequest } from '../requests/updateCardRequest';
import { getCardRequest } from '../requests/getCardRequest';

export function* getCardDataSaga(action) {
  const data = action.payload;
  const success = yield call(getCardRequest, data);

  if (success) {
    console.log('data received');
    console.log(success, success.cardName);
    yield put(saveCard(success));
  }
}

export function* getCardSaga() {
  yield takeEvery(getCard, getCardDataSaga);
}

export function* updateCardDataSaga(action) {
  const { cardNumber, expiryDate, cardName, cvc } = action.payload;
  const success = yield call(
    updateCardRequest,
    cardNumber,
    expiryDate,
    cardName,
    cvc
  );
  console.log(success);
  if (success) {
    yield put(getCard());
    console.log('card data updated');
  } else {
    console.log('card data NOT UPDATED');
  }
}

export function* updateCardSaga() {
  yield takeEvery(updateCard, updateCardDataSaga);
}
