import { RootState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';

export const userSelect = createSelector(
  (state: RootState) => state,
  (state) => state.user
);
