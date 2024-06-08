import { Server } from "socket.io";

import { emitMessageReceived } from "./emit/emitFetchUserData.js";

let io;

export function registerSocketServer(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("BE: user connected:" + socket.id);

    socket.on("disconnect", () => {
      console.log("BE:someone disconnected");
    });

    socket.on("sendMessage", (data) => {
      emitMessageReceived(io, data);
    });
  });
}
