/* eslint-disable @typescript-eslint/no-empty-function */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { store } from '../store';
import { login } from '../../http/userAPI';

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
      // debugger
    },
  },
  extraReducers: () => { },
});

export const { setAuth } = authSlice.actions;

export const emailLogin = createAsyncThunk(
  '/login',
  async ({ email, password }: { email: string; password: string }) => {
    // debugger;
    const data = await login(email, password);

    if (!data) {
      console.log("auth error")
    }

    const state = store.getState();
    store.dispatch(setAuth({
      ...state.auth,
      loaded: true,
      user: {
        id: data.id,
        email: data.email,
      },
      isAuth: true,
    }));
  },
);

export const logout = createAsyncThunk(
  '/logout',
  async () => {
    const state = store.getState();
    store.dispatch(setAuth({
      ...state.auth,
      loaded: false,
      user: null,
			isAuth: false,
    }));
  },
);

export default authSlice.reducer;
