import { configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import alertSlice from './features/alertSlice';
import authSlice from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    alerts: alertSlice,
  },
  // middleware: new MiddlewareArray().concat(additionalMiddleware, logger)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
