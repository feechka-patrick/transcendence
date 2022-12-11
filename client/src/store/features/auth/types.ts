export type Role = 'admin' | 'user';

export interface StoredUser {
    id: string;
    nickname?: string;
    email: string;
    password?: string;
    img?: string;
    createdAt?: string;
    role?: Role;
}

export interface UserState {
    loaded: boolean;
    user: null | StoredUser;
    isAuth: boolean;
}
