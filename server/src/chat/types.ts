// Каналы имеют id, который начинается с собаки
import { Socket } from 'socket.io';

type ChannelId = `@${string}`;

type UserId = string;

export interface ChannelMap {
    [key: ChannelId]: Channel
}

export  interface Channel {
    members: UserId[]; // actually users id
    admin: UserId | null; // null for public channel, other channels must have admin
    isPublic: boolean; // public is seen in list, private is hidden
    password: string | null;
}

export interface User {
    id: UserId;
    socket: Socket;
    name: string;
    channels: ChannelId[];
}

export interface ChatMessage {
    author: UserId, // who sent message
    where: ChannelId | UserId; // in which channel message was sent. For users, sender -> to who sent message, receiver -> from who received message
    message: string; // message itself
}

export enum SocketEvents {
    REGISTRATION = 'registration', // register new user
    MESSAGE = 'message', // send message
    LIST= 'list' // sent info about all users and channels
}
