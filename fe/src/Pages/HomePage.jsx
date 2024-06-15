import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../api/api.js";
import Loader from "../reusable/components/Loader.jsx";

export default function HomePage() {
  const data = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (data.isLoading) return <Loader />;

  if (data.data.error) return <div>error</div>;

  const { users } = data.data.data;

  return (
    <div>
      <h1>HomePage</h1>
    </div>
  );
}
