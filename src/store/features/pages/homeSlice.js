import { createSlice } from '@reduxjs/toolkit';

export const homeSlice = createSlice({
  name: 'pages/home',
  initialState: {
    attributes: null,
    equippedAttributes: null,
    battleStats: null,
    criminalCareer: null,
  },
  reducers: {
    setAttributes(state, action) {
      state.attributes = action.payload;
    },

    setEquippedAttributes(state, action) {
      state.equippedAttributes = action.payload;
    },

    setBattleStats(state, action) {
      state.battleStats = action.payload;
    },

    setCriminalCareer(state, action) {
      state.criminalCareer = action.payload;
    },
  },
});

export const {
  setAttributes,
  setEquippedAttributes,
  setBattleStats,
  setCriminalCareer,
} = homeSlice.actions;

export default homeSlice.reducer;
