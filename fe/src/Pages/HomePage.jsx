import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../api/api.js";
import Loader from "../reusable/components/Loader.jsx";

export default function HomePage() {
  const data = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (data.isLoading || data.data.data === undefined) return <Loader />;

  if (data.isError) return <h1>Something went wrong</h1>;

  const { users } = data.data.data;
  return <h1>HomePage</h1>;
}
