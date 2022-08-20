import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    generalInfo: null,
    isInPrison: false,
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

    setIsInPrison(state, action) {
      state.isInPrison = action.payload;
    }
  },
});

export const { setUser, setToken, setGeneralInfo, setIsInPrison } = authSlice.actions;
export default authSlice.reducer;
