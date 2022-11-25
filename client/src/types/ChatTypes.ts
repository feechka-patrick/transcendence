export type ChannelId = `@${string}`;

export type UserId = string;

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

export interface DirectMessagesMap {
  [key: UserId]: {
    messages: ChatMessage[]
  }
}

export enum SocketEvents {
  REGISTRATION = 'registration', // register new user
  MESSAGE = 'message', // send message
  LIST = 'list' // sent info about all users and channels
}
