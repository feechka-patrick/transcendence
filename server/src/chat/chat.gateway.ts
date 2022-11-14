import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

// TODO:: add namespace for chat
@WebSocketGateway({ cors: true })
export class chatGateway {
    @WebSocketServer()
    server;

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: string): void {
        console.log('message', message);
        this.server.emit('message', message);
    }
}