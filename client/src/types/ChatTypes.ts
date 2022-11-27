export type ChannelId = `@${string}`;

export type UserId = string;

export type ActiveChat = ChannelId | UserId;

export type UsersList = UserId[];

export interface ChatMessage {
  author: UserId;
  where: ChannelId | UserId;
  message: string;
}

export interface ChannelsMap {
  [key: ChannelId] : {
    messages: ChatMessage[],
    members: UserId[]
  }
}

export interface ChannelList { [key: ChannelId]: UserId[] }

export interface DirectMessagesMap {
  [key: UserId]: {
    messages: ChatMessage[]
  }
}

// eslint-disable-next-line no-shadow
export enum SocketEvents {
  REGISTRATION = 'registration', // register new user
  MESSAGE = 'message', // send message
  LIST = 'list' // sent info about all users and channels
}
