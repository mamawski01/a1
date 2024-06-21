import io from "socket.io-client";

export const feSocket = io("http://localhost:7000");

export default function connectWithSocketServer() {
  feSocket.on("connect", () => {
    console.log("feSocket: " + feSocket.id);
  });
}

export function updateRealtime(data) {
  return feSocket.emit("sendData", data);
}
