import { createSelector } from '@reduxjs/toolkit';

const selectOrder = (store) => store.order;
export const addressList = createSelector(
  selectOrder,
  (order) => order.addressList
);
export const orderPlaced = createSelector(
  selectOrder,
  (order) => order.orderPlaced
);
export const coords = createSelector(selectOrder, (order) => order.coords);
