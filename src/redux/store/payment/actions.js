import { createAction } from '@reduxjs/toolkit';

export const updateCard = createAction('@payment/updateCard'); // отправить обновленные данные на сервер
export const getCard = createAction('@payment/getCard'); // запросить с сервера
export const saveCard = createAction('@payment/saveCard'); // сохранить в стор
