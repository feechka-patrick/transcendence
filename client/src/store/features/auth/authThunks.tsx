import { createAsyncThunk } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { login } from '../../../http/userAPI';
import { setToken, removeToken, getToken } from '../../token';
import { StoredUser } from './types';

export const emailLogin = createAsyncThunk(
  '/login',
  async ({ email, password }: { email: string; password: string }) => {
    const token = await login(email, password);
    setToken(token);
    const data: StoredUser = jwtDecode(token);
    return {
      loaded: true,
      user: {
        id: data.id,
        email: data.email,
      },
      isAuth: true,
    };
  },
);

export const logout = createAsyncThunk(
  '/logout',
  async () => {
    removeToken();
    return ({
      loaded: false,
      user: null,
      isAuth: false,
    });
  },
);

export const updateAuthListener = createAsyncThunk(
  '/updateAuthListener',
  async () => {
    const data : StoredUser = jwtDecode(getToken() ?? '');

    return ({
      loaded: true,
      user: {
        id: data.id,
        email: data.email,
      },
      isAuth: true,
    });
  },
);
