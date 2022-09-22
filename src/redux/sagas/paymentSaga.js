import { takeEvery, call, put } from 'redux-saga/effects';
import { updateCard, getCard, saveCard } from '../payment/actions';
import { updateCardRequest } from '../requests/updateCardRequest';
import { getCardRequest } from '../requests/getCardRequest';

function* getCardDataSaga(action) {
  const data = action.payload;
  const success = yield call(getCardRequest, data);

  if (success) {
    yield put(saveCard(success));
  }
}

export function* getCardSaga() {
  yield takeEvery(getCard, getCardDataSaga);
}

function* updateCardDataSaga(action) {
  const { cardNumber, expiryDate, cardName, cvc } = action.payload;
  const success = yield call(
    updateCardRequest,
    cardNumber,
    expiryDate,
    cardName,
    cvc
  );
  if (success) {
    yield put(getCard());
  } else {
    alert('Не удалось обновить платежные данные');
  }
}

export function* updateCardSaga() {
  yield takeEvery(updateCard, updateCardDataSaga);
}
