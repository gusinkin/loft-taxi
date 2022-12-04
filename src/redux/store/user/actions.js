import { createAction } from '@reduxjs/toolkit';

export const logIn = createAction('@user/logIn');
export const logOut = createAction('@user/logOut');
export const authenticate = createAction('@user/auth');
export const register = createAction('@user/reg');
