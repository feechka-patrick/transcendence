import { $host } from "."
import jwtDecode from 'jwt-decode';

export const registration = async (email, password) => {
    const response = await $host.post('auth/registration', {email, password, role: 'user'})
    return jwtDecode(response.data);
}

export const login = async (email, password) => {
    const response = await $host.post('/auth/login', {email, password})
    return jwtDecode(response.data);
}

export const changeEmail = async (email, new_email, password) => {
    const response = await $host.post('/users/changeEmail', {email, new_email, password})
    return response;
}

export const deleteUser = async (email, password) => {
    const response = await $host.post('/users/deleteUser', {email, password})
    return response;
}

export const decodeToken = async (token) => {
    const response = await $host.post('/auth/decodeToken', {token})
    return response
}

export const getGamesByUser = async (userEmail) => {
    const response = await $host.post('/games/store', {userEmail})
    return response
}

export const createGame = async (winner, time, userId) => {
    const response = await $host.post('/games', {winner, time, userId})
    return response
}