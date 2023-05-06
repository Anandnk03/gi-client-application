import { configureStore } from '@reduxjs/toolkit';
import layoutSlice from './layoutSlice';
import planingSlice from './planingSlice';

export const store = configureStore({
  reducer: {
    layout: layoutSlice,
    planing: planingSlice,
  },
});
