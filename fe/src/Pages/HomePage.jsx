import { feSocket } from "../feIo/feIo.js";
import { useEffect, useState } from "react";

import { apiUserDeleteUser, apiUserPatchUser, apiUsers } from "../api/api.js";
import Card from "../reusable/components/Card.jsx";
import {
  BookOpenIcon,
  CheckIcon,
  HomeModernIcon,
  PencilIcon,
  PhoneIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { calculateAge } from "../reusable/utils/helpers.js";

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
    <>
      <div className="">
        {users.length === 0 && "No Users for registration"}
      </div>
      <div className="flex flex-col gap-6 [&>*:nth-child(even)]:bg-slate-500/10">
        {users
          .slice()
          .reverse()
          .map((user, i) => (
            <Card
              key={i}
              imgSrc={user.image}
              mainTitle={[user.firstName, user.middleName, user.lastName]}
              mainDescription={[
                user.position,
                "Birthday " + user.birthdate + ",",
                "Age " + calculateAge(user.birthdate),
              ]}
              icons={[
                {
                  icons: <HomeModernIcon />,
                  iconsDetails: [
                    user.street + " St.",
                    "Purok " + user.purok,
                    "Brgy. " + user.brgy,
                    user.city + " City",
                    user.province,
                    user.country,
                  ],
                },
                {
                  icons: <PhoneIcon />,
                  iconsDetails: [
                    user.contactNumber1,
                    user.contactNumber2,
                    user.contactNumber3,
                    user.email,
                  ],
                },
                {
                  icons: <BookOpenIcon />,
                  iconsDetails: [
                    "SSS: " + user.SSS,
                    "Pag-Ibig: " + user.PagIbig,
                    "PhilHealth: " + user.PhilHealth,
                    "TIN: " + user.TIN,
                  ],
                },
              ]}
              btn={[
                {
                  btn: {
                    function: () => window.open(user.image, "_blank"),

                    text: "confirm",
                    color: "green",
                    icon: { icon: <CheckIcon></CheckIcon> },
                  },
                },
                {
                  btn: {
                    function: () => apiUserPatchUser(user._id),
                    to: "registerUser/" + user._id,
                    text: "edit",
                    color: "yellow",
                    type: "link",
                    icon: { icon: <PencilIcon></PencilIcon> },
                  },
                },
                {
                  btn: {
                    function: () => apiUserDeleteUser(user._id),
                    text: "delete",
                    color: "red",
                    icon: { icon: <TrashIcon></TrashIcon> },
                  },
                },
              ]}
            ></Card>
          ))}
      </div>
    </>
  );
}
