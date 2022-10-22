import { createAction } from '@reduxjs/toolkit';

export const getAddressList = createAction('@order/getAddressList');
export const saveAddressList = createAction('@order/saveAddressList');
export const placeOrder = createAction('@order/placeOrder');
export const getRoute = createAction('@order/getRoute');
export const setRoute = createAction('@order/setRoute');
