import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import type { RootState } from '../store';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface AlertItem {
  uid?: string;
  type?: AlertType;
  message: string;
  preventAutoDismiss?: boolean;
}

interface AlertState {
  stack: AlertItem[];
}

const initialState: AlertState = {
  stack: [],
};

export const alertSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    updateStack: (state, action: PayloadAction<AlertItem[]>) => {
      state.stack = action.payload;
    },
  },
});

const { updateStack } = alertSlice.actions;

export const alert = createAsyncThunk(
  'alert',
  (
    { message, preventAutoDismiss = false, type = 'success' }: AlertItem,
    { dispatch, getState },
  ) => {
    const stack = [...(getState() as RootState).alerts.stack];
    const id = uuid();
    const item = {
      message, preventAutoDismiss, type, uid: id,
    };

    stack.push(item);
    dispatch(updateStack(stack));
    // debugger;
    if (!preventAutoDismiss) {
      setTimeout(() => {
        // eslint-disable-next-line no-shadow
        const stack = [...(getState() as RootState).alerts.stack].filter(
          (i) => i.uid !== item.uid,
        );
        dispatch(updateStack(stack));
      }, 5000);
    }
  },
);

export const dismissMessage = createAsyncThunk(
  'dismiss-message',
  (uid: string, { dispatch, getState }) => {
    const stack = [...(getState() as RootState).alerts.stack].filter(
      (i) => i.uid !== uid,
    );

    dispatch(updateStack(stack));
  },
);

export default alertSlice.reducer;
