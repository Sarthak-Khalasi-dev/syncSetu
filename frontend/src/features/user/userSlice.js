import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  preferences: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUserProfile, updatePreferences, setLoading } = userSlice.actions;
export default userSlice.reducer;
