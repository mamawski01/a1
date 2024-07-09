import { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";

import { feSocket } from "../feIo/feIo";
import { apiAttendances, getConfirmUsers } from "../api/api";

import Table from "../reusable/components/Table";

export default function Attendance() {
  const [confirmUsers, confirmUsersSet] = useState([]);
  console.log(confirmUsers);

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

  feSocket.on("dataReceivedAttendance", (data) => {
    attendanceSet(data);
  });

  const [attendance, attendanceSet] = useState([]);

  const [value, setValue] = useState({
    startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
    endDate: dayjs().endOf("month").format("YYYY-MM-DD"),
  });

  useEffect(() => {
    async function fetchConfirmUsers() {
      const response = await apiAttendances();
      return response;
    }
    fetchConfirmUsers();
    //cleaning
    return () => {};
  }, []);

  const [daysArr, daysArrSet] = useState(defaultDates());

  function whileDate(startDate, endDate) {
    const dateStrings = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateString = dayjs(currentDate).format("YY-MM-DD ddd DD");
      dateStrings.push(dateString);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateStrings;
  }

  function handleValueChange(newValue) {
    setValue(newValue);

    const startDate = new Date(newValue.startDate);
    const endDate = new Date(newValue.endDate);

    daysArrSet(whileDate(startDate, endDate));
  }

  function defaultDates() {
    const startDate = value.startDate;
    const endDate = dayjs().endOf("month").$d;

    return whileDate(startDate, endDate);
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-evenly">
        <h1 className="flex text-center text-lg md:text-5xl">
          Employee Attendance Record
        </h1>
        <div className="flex items-center gap-2 text-nowrap px-4">
          <p className="">Attendance Date:</p>
          <div className="w-60">
            <label htmlFor="datePicker"></label>
            <Datepicker
              value={value}
              onChange={handleValueChange}
              inputId="datePicker"
            />
          </div>
        </div>
      </div>
      <h1 className="pb-6 text-center text-lg font-bold">
        Start date: {value.startDate} / End date: {value.endDate}
      </h1>
      <div className="flex flex-col gap-2 [&>*:nth-child(even)]:bg-slate-500/10">
        {confirmUsers
          .slice()
          .reverse()
          .map((confirmUser, i) => (
            <Table
              key={i}
              data={{
                data: {
                  details: [
                    {
                      detailsData: confirmUser.id,
                      userId: confirmUser.attendanceId,
                    },
                    {
                      detailsLabel: "User id: ",
                      detailsData: confirmUser._id,
                    },
                    {
                      detailsLabel: "Name: ",
                      detailsData:
                        confirmUser.firstName + " " + confirmUser.lastName,
                    },
                  ],
                  content: [
                    {
                      contentLabels: daysArr,
                    },
                  ],
                },
              }}
            ></Table>
          ))}
      </div>
    </div>
  );
}
