import PropTypes from "prop-types";

import Btn from "../reusable/components/Btn.jsx";
import { feSocket } from "../feIo/feIo.js";
import { useEffect, useState } from "react";
import { apiUserDeleteUser, apiUsers } from "../api/api.js";

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
      <h1>
        {users.map((user, i) => (
          <Sample
            key={i}
            user={user}
            apiUserDeleteUser={apiUserDeleteUser}
          ></Sample>
        ))}
      </h1>
    </div>
  );
}

function Sample({ user, apiUserDeleteUser }) {
  return (
    <div>
      {user.firstName}{" "}
      <Btn onClick={() => apiUserDeleteUser(user._id)} text={"delete"}></Btn>
      {user._id}
    </div>
  );
}

Sample.propTypes = {
  mutate: PropTypes.any,
  user: PropTypes.any,
  apiUserDeleteUser: PropTypes.any,
};
