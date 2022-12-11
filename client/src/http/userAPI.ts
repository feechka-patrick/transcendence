import { $host } from '.';

export const registration = async (email: string, password: string) => {
  const response = await $host.post('auth/registration', { email, password, role: 'user' });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await $host.post('/auth/login', { email, password });
  return response.data;
};

// eslint-disable-next-line camelcase
export const changeEmail = async (email: string, new_email: string, password: string) => {
  // eslint-disable-next-line camelcase
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
