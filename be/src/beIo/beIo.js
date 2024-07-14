import { Server } from "socket.io";

async function emitter(mess, io, data) {
  try {
    io.emit(mess, data);
  } catch (err) {
    console.log(err);
    io.emit(mess, {
      error: err,
    });
  }
}

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
      emitter("dataReceived", io, data);
    });
    socket.on("sendDataConfirmUser", (data) => {
      emitter("dataReceivedConfirmUser", io, data);
    });
    socket.on("sendAttendance", (data) => {
      emitter("dataReceivedAttendance", io, data);
    });
    socket.on("sendAttendanceSetting", (data) => {
      emitter("dataReceivedAttendanceSetting", io, data);
    });
  });
}
