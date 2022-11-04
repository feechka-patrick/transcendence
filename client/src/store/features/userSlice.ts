import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Role = 'admin' | 'user';

export interface StoredUser  {
    id: string;
    email: string;
    password: string;
    nickname?: string;
    img?: string;
    createdAt: string;
    role: Role;
  }

interface UserState {
    user: null | StoredUser;
}

const initialState: UserState = {
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            const { user } = action.payload;
            state.user = user;
        },
    },
    extraReducers: () => { },
});

// export const loginEmail = async (email, password) => {
    
// }

export const { setUser } = userSlice.actions;
export default userSlice.reducer;