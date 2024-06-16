import PropTypes from "prop-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Loader from "../reusable/components/Loader.jsx";
import { apiUserDeleteUser, apiUsers } from "../api/api.js";
import Btn from "../reusable/components/Btn.jsx";

export default function HomePage() {
  const data = useQuery({
    queryKey: ["users"],
    queryFn: apiUsers,
  });

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: apiUserDeleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  if (data.isLoading) return <Loader />;

  if (data.data.error) return <div>error</div>;
  const { users } = data.data.data;

  return (
    <div>
      <h1>
        {users.map((user, i) => (
          <Sample key={i} user={user} mutate={mutate}></Sample>
        ))}
      </h1>
    </div>
  );
}

function Sample({ user, mutate }) {
  return (
    <div>
      {user.firstName} <Btn onClick={() => mutate(user._id)}>delete</Btn>
      {user._id}
    </div>
  );
}

Sample.propTypes = {
  mutate: PropTypes.any,
  user: PropTypes.any,
};
