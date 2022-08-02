import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import homeReducer from './features/pages/homeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
  },
});
