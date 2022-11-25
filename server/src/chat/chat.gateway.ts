import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChannelMap, User, SocketEvents } from './types';

@WebSocketGateway({
  cors: true,
  path: '/chat-socket'
})
export class chatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  users: User[] = [];
  channels: ChannelMap = {};

  afterInit(server: Server) {
    this.channels = {
      '@general': {
        isPublic: true,
        admin: null,
        members: [],
        password: null
      }
    };
    this.users = [];
  }

  broadcastList() {
    this.server.emit(SocketEvents.LIST, {
      usersData: this.users.map(user => user.id),
      channelsData: Object.keys(this.channels)
        .reduce((acc, item) => {
          return {
            ...acc,
            [item]: this.channels[item].members
          };
        }, {})
    });
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    this.users.push({
      id: client.id,
      socket: client,
      channels: ['@general'],
      name: client.id
    });
    this.channels['@general'].members.push(client.id);
    console.log('registered', client.id);
    client.emit(SocketEvents.REGISTRATION, { myIdData: client.id });
    this.broadcastList();
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    const user = this.users.find(({ id }) => id === client.id);
    if (!user) return;

    // quit channels
    user.channels.forEach(channelId => {
      this.channels[channelId].members = this.channels[channelId].members.filter((memberId) => memberId !== user.id);
    });

    // remove from user list
    this.users = this.users.filter(({ id }) => id !== client.id);

    // notify clients about changes
    this.broadcastList();
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody('to') to: string,
    @MessageBody('message') message: string
  ): void {
    // handle message to the channel
    if (to.startsWith('@')) {
      // send message to each member in channel
      this.channels[to].members.forEach(memberId => {
        const member = this.users.find(user => user.id === memberId);
        console.log('sending message to', member.socket.id);
        member.socket.emit(SocketEvents.MESSAGE, {
          author: client.id,
          where: to,
          message
        });
      });
    }
    // handle message to the user
    else {
      const receiver = this.users.find(user => user.id === to);
      // send message to the receiver
      receiver.socket.emit(SocketEvents.MESSAGE, {
        author: client.id,
        where: client.id,
        message
      });
      // send message to him/her back to show that message has sent
      client.emit(SocketEvents.MESSAGE, {
        author: client.id,
        where: receiver.id,
        message
      });
    }
  }
}
