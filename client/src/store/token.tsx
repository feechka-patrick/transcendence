/* eslint-disable implicit-arrow-linebreak */
const TOKEN = 'authToken';

export const getToken = () => localStorage.getItem(TOKEN);

export const setToken = (v: string) => localStorage.setItem(TOKEN, v);

export const removeToken = () => localStorage.removeItem(TOKEN);
