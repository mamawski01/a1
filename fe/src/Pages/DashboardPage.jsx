import { useEffect, useState } from "react";
import {
  apiConfirmUserDelete,
  apiConfirmUserPatchUser,
  getConfirmUsers,
} from "../api/api";
import Card from "../reusable/components/Card";
import {
  calculateAge,
  capitalizeFirstLetterEachWord,
} from "../reusable/utils/helpers";
import {
  BookOpenIcon,
  BookmarkSquareIcon,
  ExclamationTriangleIcon,
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
                    user.street &&
                      "St: " + capitalizeFirstLetterEachWord(user.street),
                    user.purok &&
                      "Purok: " + capitalizeFirstLetterEachWord(user.purok),
                    user.brgy &&
                      "Brgy: " + capitalizeFirstLetterEachWord(user.brgy),
                    user.city &&
                      " City: " + capitalizeFirstLetterEachWord(user.city),
                    capitalizeFirstLetterEachWord(user.province),
                    capitalizeFirstLetterEachWord(user.country),
                  ],
                },
                {
                  icons: <PhoneIcon />,
                  iconsDetails: [
                    user.contactNumber1 && user.contactNumber1,
                    user.contactNumber2 && user.contactNumber2,
                    user.contactNumber3 && user.contactNumber3,
                    user.email && user.email,
                  ],
                },
                {
                  icons: <BookOpenIcon />,
                  iconsDetails: [
                    user.SSS && "SSS: " + user.SSS,
                    user.PagIbig && "Pag-Ibig: " + user.PagIbig,
                    user.PhilHealth && "PhilHealth: " + user.PhilHealth,
                    user.TIN && "TIN: " + user.TIN,
                  ],
                },
                {
                  icons: <ExclamationTriangleIcon />,
                  iconsDetails: [
                    user.contactPersonNameInEmergency &&
                      "Contact Person In Emergency: " +
                        capitalizeFirstLetterEachWord(
                          user.contactPersonNameInEmergency,
                        ),
                    user.contactPersonNumberInEmergency &&
                      "Contact Person Number In Emergency: " +
                        user.contactPersonNumberInEmergency,
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
                    function: () => apiConfirmUserPatchUser(user._id),
                    to: "confirmUser/userAttendance/" + user._id,
                    text: "attendanceForm",
                    color: "yellow",
                    type: "link",
                    icon: { icon: <BookmarkSquareIcon></BookmarkSquareIcon> },
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
