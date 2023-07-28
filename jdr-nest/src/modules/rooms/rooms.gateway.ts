import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { buildConfig } from "@backend/config";

@WebSocketGateway({
  cors: {
    origin: buildConfig().APP_URL
  }
})
export class RoomsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("userConnected")
  userConnected() {
    console.log(" a user is connected");

    this.server.emit("getUserList", { players: ["Player 1", "Player 2", "Player 3"] });
  }
}
