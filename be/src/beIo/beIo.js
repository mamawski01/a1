import { Server } from "socket.io";

import {
  emitDataReceived,
  emitDataReceivedConfirmUser,
} from "./emit/emitDataReceived.js";

let io;

export function registerSocketServer(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("sendData", (data) => {
      emitDataReceived(io, data);
    });
    socket.on("sendDataConfirmUser", (data) => {
      emitDataReceivedConfirmUser(io, data);
    });
  });
}
