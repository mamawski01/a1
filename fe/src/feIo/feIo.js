import io from "socket.io-client";

export const feSocket = io("http://localhost:7000");

export default function connectWithSocketServer() {
  feSocket.on("connect", () => {
    feSocket.id;
  });
}

export function updateRealtime(data) {
  return feSocket.emit("sendData", data);
}

export function updateRealtimeConfirmUser(data) {
  return feSocket.emit("sendDataConfirmUser", data);
}

export function updateRealtimeAttendance(data) {
  return feSocket.emit("sendAttendance", data);
}

export function updateRealtimeAttendanceSettings(data) {
  return feSocket.emit("sendAttendanceSetting", data);
}

export function updateRealtimeSchedule(data) {
  return feSocket.emit("sendSchedule", data);
}
