import { useEffect, useState } from "react";
import { feSocket, updateRealtime } from "../feIo/feIo.js";
import { apiUsers } from "../api/api.js";

export default function DashboardPage() {
  const [users, usersSet] = useState([]);

  feSocket.on("dataReceived", (data) => {
    usersSet(data);
  });

  useEffect(() => {
    async function fetchUsers() {
      const response = await apiUsers();
      return response;
    }
    fetchUsers();
    //cleaning
    return () => {};
  }, []);

  const [message, messageSet] = useState("");

  const [messageReceived, messageReceivedSet] = useState();

  function sendMessage() {
    updateRealtime(message);
  }

  feSocket.on("dataReceived", (data) => {
    messageReceivedSet(data);
  });

  return (
    <div>
      <p>{users[0].firstName}</p>
      <input
        type="text"
        className="input"
        placeholder="...."
        onChange={(e) => messageSet(e.target.value)}
      />
      <button onClick={sendMessage}>click</button>
      <h1>Message:{messageReceived}</h1>
      <div className="mt-10">
        <div className="bg-slate-500">{users[0].firstName}</div>
      </div>
    </div>
  );
}
