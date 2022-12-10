/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { createAsyncThunk } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { store } from '../../store';
import { login } from '../../../http/userAPI';
import { setAuth, StoredUser } from './authSlice';
import { setToken, removeToken, getToken } from '../../token';

export const emailLogin = createAsyncThunk(
  '/login',
  async ({ email, password }: { email: string; password: string }) => {
    debugger
    const token = await login(email, password);
    setToken(token);
    const data : StoredUser = jwtDecode(token);

    store.dispatch(setAuth({
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
    removeToken();
    const state = store.getState();
    store.dispatch(setAuth({
      ...state.auth,
      loaded: false,
      user: null,
      isAuth: false,
    }));
  },
);

export const updateAuthListener = createAsyncThunk(
  '/updateAuthListener',
  async () => {
    const data : StoredUser = jwtDecode(getToken());

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
