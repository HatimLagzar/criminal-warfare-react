import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    generalInfo: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },

    setUser(state, action) {
      state.user = action.payload;
    },

    setGeneralInfo(state, action) {
      state.generalInfo = action.payload;
    },
  },
});

export const { setUser, setToken, setGeneralInfo } = authSlice.actions;
export default authSlice.reducer;
