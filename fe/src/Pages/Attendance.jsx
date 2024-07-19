import { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";

import { feSocket } from "../feIo/feIo";

import Table from "../reusable/components/Table";
import { apiConfirmUsers } from "../api/confirmUser";
import { apiAttendances } from "../api/attendance";
import { apiAttendanceSettings } from "../api/attendanceSetting";
import Btn from "../reusable/components/Btn";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";

export default function Attendance() {
  const [confirmUsers, confirmUsersSet] = useState([]);

  feSocket.on("dataReceivedConfirmUser", (data) => {
    confirmUsersSet(data);
  });

  useEffect(() => {
    async function fetchConfirmUsers() {
      const response = await apiConfirmUsers();
      return response;
    }
    fetchConfirmUsers();
    //cleaning
    return () => {};
  }, []);

  const [attendance, attendanceSet] = useState([]);

  feSocket.on("dataReceivedAttendance", (data) => {
    attendanceSet(data);
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

  const [attendanceSetting, attendanceSettingSet] = useState([]);

  feSocket.on("dataReceivedAttendanceSetting", (data) => {
    attendanceSettingSet(data);
  });

  useEffect(() => {
    async function fetchData() {
      const response = await apiAttendanceSettings();
      return response;
    }
    fetchData();
    //cleaning
    return () => {};
  }, []);

  const [value, setValue] = useState({
    startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
  });

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
    const endDate = dayjs().$d;

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
      <h1 className="font-bold">Attendance rules:</h1>
      <div className="flex items-center justify-evenly">
        <span>Break time: {attendanceSetting[0]?.breakTime}</span>
        <span>Duty hours: {attendanceSetting[0]?.regularDutyHours}</span>
        <span>Holiday Rating: {attendanceSetting[0]?.regularRating}</span>
        <span>Overtime Starts: {attendanceSetting[0]?.overtimeStarts}</span>
        <Btn
          text="Edit Attendance setting"
          icon={[{ icon: <Cog6ToothIcon /> }]}
          type="link"
          color={"yellow"}
          to={"attendanceSettingForm/" + attendanceSetting[0]?._id}
        ></Btn>
      </div>
      <div className="flex flex-col gap-10 [&>*:nth-child(even)]:bg-slate-500/10">
        {confirmUsers
          .slice()
          .reverse()
          .map((confirmUser, i) => (
            <Table
              key={i}
              attendanceSetting={attendanceSetting}
              data={{
                data: {
                  details: [
                    {
                      detailsLabel: "Attendance Id: ",
                      detailsData: confirmUser.attendanceId,
                      userId: confirmUser._id,
                    },
                    {
                      detailsLabel: "Wage: ",
                      detailsData: confirmUser.wage,
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
                      contentData: attendance,
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
