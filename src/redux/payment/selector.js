import { createSelector } from '@reduxjs/toolkit';

const selectPayment = (store) => store.payment;
export const hasCard = createSelector(
  selectPayment,
  (payment) => payment.cardLinked
);
