import io from "socket.io-client";

export const feSocket = io("http://localhost:7000");

export default function connectWithSocketServer() {
  feSocket.on("connect", () => {
    console.log("FE: connected:" + feSocket.id);
  });
}

export function getPress(message) {
  return feSocket.emit("sendMessage", { message });
}
