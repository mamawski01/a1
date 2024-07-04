import { useEffect, useState } from "react";
import { feSocket } from "../feIo/feIo";
import { apiAttendances } from "../api/api";
import UserAttendance from "../reusable/components/UserAttendance";

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
  return (
    <div>
      <div className="flex items-center justify-evenly">
        <h1 className="text-5xl">Employee Attendance Record</h1>
        <div id="date-range-picker" className="flex items-center"></div>
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
