import PropTypes from "prop-types";
import Btn from "./Btn";
import {
  BookOpenIcon,
  CheckIcon,
  HomeModernIcon,
  PencilIcon,
  PhoneIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

export default function Card({ user, apiUserDeleteUser }) {
  const [expand, expandSet] = useState(false);
  return (
    <div className="container2">
      <div
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg p-1 hover:bg-slate-200/20"
        onClick={() => expandSet(!expand)}
      >
        <img
          src={user.image}
          onError={(e) => {
            e.target.src = "/Asset2.png";
            e.target.alt = "Asset2.png";
            e.target.title = "Asset2.png";
          }}
          alt={user.image}
          className="h-32 w-32 rounded-full object-cover"
          title={user.image}
        />
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-semibold tracking-wide md:text-3xl">
            {user.firstName} {user.middleName} {user.lastName}
          </h1>
          <p className="text-base">{user.position}</p>
        </div>
      </div>
      {expand && (
        <div className="flex flex-col gap-2">
          <div className="mt-3 flex flex-wrap justify-center gap-1">
            <span className="w-5">
              <HomeModernIcon></HomeModernIcon>
            </span>
            <span>
              {user.street && `${user.street}, `}
              {user.purok && `${user.purok}, `}
              {user.barangay && `${user.barangay}, `}
              {user.city && `${user.city}, `}
              {user.province && `${user.province}, `}
              {user.country && `${user.country}`}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-1">
            <span className="w-5">
              <PhoneIcon></PhoneIcon>
            </span>
            <span>
              {user.contactNumber1}
              {user.contactNumber2 && ` | ${user.contactNumber2}`}
              {user.contactNumber3 && ` | ${user.contactNumber3}`}
              {user.email && ` | ${user.email}`}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-1">
            <span className="w-5">
              {user.SSS || user.PagIbig || user.PhilHealth || user.TIN ? (
                <BookOpenIcon></BookOpenIcon>
              ) : null}
            </span>
            <span>
              {user.SSS && `SSS: ${user.SSS}, `}
              {user.PagIbig && `PagIbig: ${user.PagIbig}, `}
              {user.PhilHealth && `PhilHealth: ${user.PhilHealth}, `}
              {user.TIN && `TIN: ${user.TIN}, `}
            </span>
          </div>
        </div>
      )}
      <div className="mt-6 flex flex-wrap justify-evenly">
        <Btn
          onClick={() => apiUserDeleteUser(user._id)}
          text={"Approved"}
          color={"green"}
          icons={[
            {
              icons: <CheckIcon></CheckIcon>,
            },
          ]}
        ></Btn>
        <Btn
          onClick={() => apiUserDeleteUser(user._id)}
          text={"Edit"}
          color={"yellow"}
          icons={[
            {
              icons: <PencilIcon></PencilIcon>,
            },
          ]}
        ></Btn>
        <Btn
          onClick={() => apiUserDeleteUser(user._id)}
          text={"Delete"}
          color={"red"}
          icons={[
            {
              icons: <XMarkIcon></XMarkIcon>,
            },
          ]}
        ></Btn>
      </div>
    </div>
  );
}

Card.propTypes = {
  user: PropTypes.any,
  apiUserDeleteUser: PropTypes.any,
};
