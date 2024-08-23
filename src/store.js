import { configureStore } from '@reduxjs/toolkit';
import { dashboardReducer } from './widgetsReducers/reducers';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer
  }
});
export default store;