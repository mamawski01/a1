import { useEffect, useState } from "react";
import {
  apiConfirmUserDelete,
  apiConfirmUserPatchUser,
  getConfirmUsers,
} from "../api/api";
import Card from "../reusable/components/Card";
import { calculateAge } from "../reusable/utils/helpers";
import {
  BookOpenIcon,
  HomeModernIcon,
  PencilIcon,
  PhoneIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { feSocket } from "../feIo/feIo";

export default function DashboardPage() {
  const [confirmUsers, confirmUsersSet] = useState([]);

  feSocket.on("dataReceivedConfirmUser", (data) => {
    confirmUsersSet(data);
  });

  useEffect(() => {
    async function fetchConfirmUsers() {
      const response = await getConfirmUsers();
      return response;
    }
    fetchConfirmUsers();
    //cleaning
    return () => {};
  }, []);

  return (
    <>
      <div className="">
        {confirmUsers.length === 0 && "No Confirmed Users"}
      </div>
      <div className="flex flex-col gap-6 [&>*:nth-child(even)]:bg-slate-500/10">
        {confirmUsers
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
                    function: () => apiConfirmUserPatchUser(user._id),
                    to: "confirmUser/" + user._id,
                    text: "edit",
                    color: "yellow",
                    type: "link",
                    icon: { icon: <PencilIcon></PencilIcon> },
                  },
                },
                {
                  btn: {
                    function: () => apiConfirmUserDelete(user._id),
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
