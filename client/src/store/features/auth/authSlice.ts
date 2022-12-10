/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Role = 'admin' | 'user';

export interface StoredUser {
    id: string;
    nickname?: string;
    email: string;
    password?: string;
    img?: string;
    createdAt?: string;
    role?: Role;
}

interface UserState {
    loaded: boolean;
    user: null | StoredUser;
    isAuth: boolean;
}

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

      console.log('set auth');
      // debugger
    },
  },
  extraReducers: () => { },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
