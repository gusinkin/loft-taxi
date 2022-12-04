import { createSelector } from '@reduxjs/toolkit';

const selectUser = (store) => store.user;
export const logged = createSelector(selectUser, (user) => user.isLoggedIn);
export const token = createSelector(selectUser, (user) => user.authToken);
