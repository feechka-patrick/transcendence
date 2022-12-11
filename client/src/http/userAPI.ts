/* eslint-disable camelcase */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import jwtDecode from 'jwt-decode';
import { $host } from '.';
import { StoredUser } from '../store/features/auth/authSlice';
import { setToken } from '../store/token';

export const registration = async (email: string, password: string) => {
  const response = await $host.post('auth/registration', { email, password, role: 'user' });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await $host.post('/auth/login', { email, password });
  return response.data;
};

export const changeEmail = async (email: string, new_email: string, password: string) => {
  const response = await $host.post('/users/changeEmail', { email, new_email, password });
  return response;
};

export const deleteUser = async (email: string, password: string) => {
  const response = await $host.post('/users/deleteUser', { email, password });
  return response;
};

export const getGamesByUser = async (userEmail: string) => {
  const response = await $host.post('/games/store', { userEmail });
  return response;
};

export const createGame = async (winner: boolean, time: string, userId: string) => {
  const response = await $host.post('/games', { winner, time, userId });
  return response;
};
