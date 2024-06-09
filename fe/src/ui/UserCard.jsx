import PropTypes from "prop-types";
import { useState } from "react";
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  HashtagIcon,
  HomeModernIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";

import { calculateAge } from "../utils/calculateAge";

export default function UserCard({
  user: {
    firstName,
    middleName,
    lastName,
    position,
    address,
    cellphoneNumbers,
    password,
    birthdate,
    email,
    SSS,
    Pag_Ibig,
    PhilHealth,
    TIN,
    contactPersonNameInEmergency,
    contactPersonNumberInEmergency,
    oneTimePassword,
  },
  i,
}) {
  const [expand, expandSet] = useState(false);

  function handleExpand() {
    expandSet(!expand);
  }

  const age = calculateAge(birthdate);
  return (
    <li className="relative rounded-md bg-zinc-900 shadow-lg shadow-zinc-800">
      <span className="absolute left-2 top-2 z-50 flex size-6 items-center justify-center rounded-full bg-slate-500 text-center align-middle">
        {i + 1}
      </span>
      <div
        onClick={handleExpand}
        className={`${expand ? "" : "items-center justify-center rounded-md pb-8 text-center"} relative flex w-full cursor-pointer items-center justify-center rounded-t-lg bg-gray-800 text-center align-middle hover:bg-gray-700 sm:px-2`}
      >
        <div
          className={`${expand ? "left-5 top-10 h-40 w-40" : "top-5 h-24 w-24"} overflow-hidden p-3 sm:relative sm:rounded-full sm:p-0`}
        >
          <img
            src="https://media.licdn.com/dms/image/C4D03AQH8qidO0nb_Ng/profile-displayphoto-shrink_800_800/0/1615696897070?e=2147483647&v=beta&t=ia3wfE2J7kVLdBy9ttkgUDAA_ul29fymykhQo0lABDo"
            className="rounded-full"
          />
        </div>

        <div className="mt-10 w-2/3 pl-5 text-start sm:text-center">
          <p className="font-poppins text-heading text-2xl font-bold sm:text-4xl">
            {firstName} {middleName} {lastName}
          </p>
          <p className="text-heading">
            {position} / {age}
          </p>
        </div>
      </div>
      {expand && (
        <div className="mt-10 flex w-full flex-col justify-evenly gap-4 p-4">
          <div className="flex w-full justify-start gap-2">
            <div className="flex gap-2">
              <PhoneIcon className="h-6 w-6"></PhoneIcon>
              <p>Contact Number(s):</p>
            </div>
            <ul className="">
              {cellphoneNumbers.map((number, i) => (
                <li key={i}>#{number}</li>
              ))}
            </ul>
          </div>
          <div className="flex gap-2">
            <HomeModernIcon className="h-6 w-6"></HomeModernIcon>
            <div className="">Address: {address}</div>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">@</span>
            <div className="">Email: {email}</div>
          </div>
          <div className="flex gap-2">
            <HashtagIcon className="h-6 w-6"></HashtagIcon>
            <div className="">SSS: {SSS}</div>
          </div>
          <div className="flex gap-2">
            <HashtagIcon className="h-6 w-6"></HashtagIcon>
            <div className="">Pag Ibig: {Pag_Ibig}</div>
          </div>
          <div className="flex gap-2">
            <HashtagIcon className="h-6 w-6"></HashtagIcon>
            <div className="">PhilHealth: {PhilHealth}</div>
          </div>
          <div className="flex gap-2">
            <HashtagIcon className="h-6 w-6"></HashtagIcon>
            <div className="">TIN: {TIN}</div>
          </div>
          <div className="flex gap-2">
            <ExclamationCircleIcon className="h-6 w-6 text-red-500"></ExclamationCircleIcon>
            <div className="">
              Contact Person In Emergency: {contactPersonNameInEmergency}
            </div>
          </div>
          <div className="flex gap-2">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-500"></ExclamationTriangleIcon>
            <div className="">
              Contact Person Number In Emergency:{" "}
              {contactPersonNumberInEmergency}
            </div>
          </div>
          <div className="flex gap-2">
            <HashtagIcon className="h-6 w-6"></HashtagIcon>
            <div className="">SSS: {SSS}</div>
          </div>
        </div>
      )}
    </li>
  );
}

UserCard.propTypes = {
  i: PropTypes.any,
  user: PropTypes.any,
};
