import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoading: false,
  generatedText: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setGeneratedText: (state, action) => {
      state.generatedText = action.payload;
    }
  } 
}); 

export const { setUser, setLoading, logout, setGeneratedText } = userSlice.actions;
export default userSlice.reducer;
