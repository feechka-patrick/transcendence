import {
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


    async handleConnection(socket: Socket) {
        console.log('registration', socket.id);
        this.users.push(socket);
        socket.emit('registration', socket.id);
        this.server.emit('usersList', this.users.map(user => user.id));
    }

    @SubscribeMessage('message')
    handleMessage(client: Socket, @MessageBody() data: any): void {
        console.log('message', data);
        console.log('usersId', this.users.map(user => user.id));
        const findUser = this.users.find(user => {
            console.log(`user ${user.id} === data ${data.data.to}`);
            return user.id === data.data.to
        });
        findUser.emit('message', { from: findUser.id, message: data.data.message });
    }
}