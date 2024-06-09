import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../api/api.js";
import Loader from "../ui/Loader.jsx";
import UserCard from "../ui/UserCard.jsx";

export default function HomePage() {
  const data = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  if (data.isLoading || data.data.data === undefined) return <Loader />;

  const { users } = data.data.data;
  console.log(users);
  return (
    <ul className="border-1 flex flex-col gap-4 rounded-lg">
      {users.map((user, i) => (
        <UserCard key={user._id} i={i} user={user}></UserCard>
      ))}
    </ul>
  );
}
