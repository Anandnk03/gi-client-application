import { configureStore } from '@reduxjs/toolkit';
import layoutSlice from './layoutSlice';
import planingSlice from './planingSlice';
import authSlice from './authSlice';
import commSlice from './commSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    layout: layoutSlice,
    planing: planingSlice,
    comm: commSlice,
  },
});
