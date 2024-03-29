import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoading: false,
  generatedText: '',
  quiz: null,
  regenerateText: ''
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
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    setRegenerateText: (state, action) => {
      state.regenerateText = action.payload;
    }
  } 
}); 

export const { setUser, setLoading, logout, setGeneratedText,setQuiz,setRegenerateText } = userSlice.actions;
export default userSlice.reducer;
