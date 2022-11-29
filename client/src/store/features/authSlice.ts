import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registration } from '../../http/userAPI';
import { RootState, store } from '../store';

type Role = 'admin' | 'user';

export interface StoredUser {
    id: string;
    nickname?: string;
    email: string;
    password: string;
    img?: string;
    createdAt: string;
    role: Role;
}

interface UserState {
    loaded: boolean;
    user: null | StoredUser;
}

const initialState: UserState = {
  loaded: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<UserState>) => {
      const { loaded, user } = action.payload;
      state.user = user;
      state.loaded = loaded;
    },
  },
  extraReducers: () => { },
});

export const { setAuth } = authSlice.actions;

export const emailSignup = createAsyncThunk(
  '/login',
  async ({ email, password }: { email: string; password: string }) => {
    const data = await registration(email, password);
    //debugger;

    const state = store.getState() as RootState;
    store.dispatch(setAuth({ ...state.auth, loaded: true }));
  },
);

export default authSlice.reducer;
