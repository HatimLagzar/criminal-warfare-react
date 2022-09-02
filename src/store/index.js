import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import homeReducer from './features/pages/homeSlice';
import jobReducer from './features/pages/jobSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    jobs: jobReducer,
  },
});
