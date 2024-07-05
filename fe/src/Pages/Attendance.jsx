import { useEffect, useState } from "react";

import { feSocket } from "../feIo/feIo";
import { apiAttendances } from "../api/api";
import UserAttendance from "../reusable/components/UserAttendance";

import Datepicker from "react-tailwindcss-datepicker";

export default function Attendance() {
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

  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });
  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  return (
    <div>
      <div className="flex items-center justify-evenly">
        <h1 className="text-5xl">Employee Attendance Record</h1>
        <div className="flex w-3/5 flex-nowrap items-center">
          <p className="">Attendance Date</p>
          <Datepicker value={value} onChange={handleValueChange} />
        </div>
      </div>

      {attendance.slice().map((attendance, i) => (
        <UserAttendance
          key={i}
          data={{
            data: {
              no: attendance.No,
              name: attendance.Name,
              userId: attendance.UserId,
              mode: attendance.Mode,
              date: attendance.DateTime,
            },
          }}
        ></UserAttendance>
      ))}
    </div>
  );
}
