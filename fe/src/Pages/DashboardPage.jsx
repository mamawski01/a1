// import { useQuery } from "@tanstack/react-query";

// import { getUsers } from "../api/api.js";
// import { useState } from "react";
// import { feSocket, getPress } from "../feIo/feIo.js";

// export default function DashboardPage() {
//   const { data, isLoading } = useQuery({
//     queryKey: ["users"],
//     queryFn: getUsers,
//   });

//   const [message, messageSet] = useState("");

//   const [messageReceived, messageReceivedSet] = useState();

//   const user = data?.data.users[0].firstName;

//   function sendMessage() {
//     getPress(message);
//   }

//   feSocket.on("messageReceived", (data) => {
//     messageReceivedSet(data.message);
//   });

//   if (isLoading) return <div>Loading</div>;
//   if (!isLoading)
//     return (
//       <div>
//         <p>{user}</p>
//         <input
//           type="text"
//           className="input"
//           placeholder="...."
//           onChange={(e) => messageSet(e.target.value)}
//         />
//         <button onClick={sendMessage}>click</button>
//         <h1>Message:{messageReceived}</h1>
//         <div className=" mt-10">
//           <div className=" bg-slate-500">{user}</div>
//         </div>
//       </div>
//     );
// }

export default function DashboardPage() {
  return <div>DashboardPage</div>;
}
