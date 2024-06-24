import { feSocket } from "../feIo/feIo.js";
import { useEffect, useState } from "react";
import { apiUserDeleteUser, apiUsers } from "../api/api.js";
import Card from "../reusable/components/Card.jsx";

export default function HomePage() {
  const [users, usersSet] = useState([]);
  console.log(users);

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

  return (
    <div>
      <div className="flex flex-col gap-6">
        {users.map((user, i) => (
          <Card
            key={i}
            user={user}
            apiUserDeleteUser={apiUserDeleteUser}
          ></Card>
        ))}
      </div>
    </div>
  );
}
