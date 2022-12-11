import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { emailLogin, logout, updateAuthListener } from './authThunks';
import { UserState } from './types';

export const initialState: UserState = {
  loaded: false,
  user: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<UserState>) => {
      const { loaded, user, isAuth } = action.payload;
      state.user = user;
      state.loaded = loaded;
      state.isAuth = isAuth;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(emailLogin.fulfilled, (state, action: PayloadAction<UserState>) => {
      const { loaded, user, isAuth } = action.payload;
      state.user = user;
      state.loaded = loaded;
      state.isAuth = isAuth;
    });
    builder.addCase(logout.fulfilled, (state, action:PayloadAction<UserState>) => {
      const { loaded, user, isAuth } = action.payload;
      state.user = user;
      state.loaded = loaded;
      state.isAuth = isAuth;
    });
    builder.addCase(updateAuthListener.fulfilled, (state, action:PayloadAction<UserState>) => {
      const { loaded, user, isAuth } = action.payload;
      state.user = user;
      state.loaded = loaded;
      state.isAuth = isAuth;
    });
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
