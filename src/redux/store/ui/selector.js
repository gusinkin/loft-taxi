import { createSelector } from '@reduxjs/toolkit';

const selectUI = (store) => store.ui;
export const page = createSelector(selectUI, (ui) => ui.page);
export const loading = createSelector(selectUI, (ui) => ui.loading);
