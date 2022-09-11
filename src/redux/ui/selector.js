import { createSelector } from '@reduxjs/toolkit';

const selectUI = (store) => store.ui;
export const selectPage = createSelector(selectUI, (ui) => ui.page);
export const logged = createSelector(selectUI, (ui) => ui.isLoggedIn);
