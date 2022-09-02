import { createSlice } from '@reduxjs/toolkit';

export const jobSlice = createSlice({
  name: 'pages/jobs',
  initialState: {
    isInJob: false,
  },
  reducers: {
    setIsInJob(state, action) {
      state.isInJob = action.payload;
    },
  },
});

export const { setIsInJob } = jobSlice.actions;

export default jobSlice.reducer;
