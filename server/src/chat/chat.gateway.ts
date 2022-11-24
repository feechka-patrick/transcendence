import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'

@WebSocketGateway({ cors: true, path: '/chat-socket' })
export class chatGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;
    users: Socket[] = [];


    async handleConnection(@ConnectedSocket() client: Socket) {
        this.users.push(client);
        client.emit('registration', { myIdData: client.id });
        this.server.emit('usersList', { usersData: this.users.map(user => user.id) });
    }

    async handleDisconnect(@ConnectedSocket() client: Socket) {
        this.users = this.users.filter(user => user.id !== client.id);
        this.server.emit('usersList', { usersData: this.users.map(user => user.id) });
    }

    @SubscribeMessage('message')
    handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody('to') to: string,
        @MessageBody('message') message: string
    ): void {
        console.log('to', to, 'message', message);
        const findUser = this.users.find(user => user.id === to);
        findUser?.emit('message', { from: client.id, message });
        client?.emit('sent', { to: findUser.id, message });
    }
}