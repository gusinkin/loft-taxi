import { takeEvery, call, put } from 'redux-saga/effects';
import { updateCard, getCard, saveCard } from '../store/payment/actions';
import { updateCardRequest } from '../requests/updateCardRequest';
import { getCardRequest } from '../requests/getCardRequest';

function* getCardDataSaga(action) {
  const data = action.payload;
  const response = yield call(getCardRequest, data);

  if (
    response.cardName &&
    response.cardNumber &&
    response.expiryDate &&
    response.cvc
  ) {
    yield put(saveCard(response));
  } else if (response.success === false) {
    console.log(
      'Не удалось получить платежные данные с сервера, ОШИБКА: ',
      response.error
    );
  } else {
    console.log(
      'Не удалось получить платежные данные с сервера, НЕИЗВЕСТНАЯ ОШИБКА'
    );
  }
}

export function* getCardSaga() {
  yield takeEvery(getCard, getCardDataSaga);
}

function* updateCardDataSaga(action) {
  const { cardNumber, expiryDate, cardName, cvc, token } = action.payload;
  const response = yield call(
    updateCardRequest,
    cardNumber,
    expiryDate,
    cardName,
    cvc,
    token
  );
  if (response.success === true) {
    yield put(getCard(token));
  } else {
    alert('Не удалось загрузить платежные данные на сервер');
  }
}

export function* updateCardSaga() {
  yield takeEvery(updateCard, updateCardDataSaga);
}
