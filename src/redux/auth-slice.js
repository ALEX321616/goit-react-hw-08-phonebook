import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isLoggedIn: false,
};


export const authSlise = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setLoggedIn(state, _) {
      state.isLoggedIn = true;
    },
    setLoggedOut(state, _) {
      state.isLoggedIn = false;
    },
  },
});
export const { setToken, setLoggedIn, setLoggedOut, setUser } =
  authSlise.actions;
export default authSlise.reducer;
