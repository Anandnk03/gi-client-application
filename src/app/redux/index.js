import { configureStore } from '@reduxjs/toolkit';
import layoutSlice from './layoutSlice';
import planingSlice from './planingSlice';
import authSlice from './authSlice';
import commSlice from './commSlice';
import reasonSlice from './reasonSlice';
import rejectionSlice from './rejection';
import dashboardSlice from './dashboard';
import roleSlice from './roleSlice';
import downTimeSlice from './downSlice';
import ComponentSlice from './ComponentSlice';
import operationSlice from './operationSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    layout: layoutSlice,
    planing: planingSlice,
    comm: commSlice,
    reason: reasonSlice,
    rejection: rejectionSlice,
    dashboard: dashboardSlice,
    role: roleSlice,
    downTime: downTimeSlice,
    component:ComponentSlice,
    operation:operationSlice
  },
});
