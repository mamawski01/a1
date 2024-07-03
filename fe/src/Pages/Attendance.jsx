import { useEffect, useState } from "react";
import { feSocket } from "../feIo/feIo";
import { apiAttendances } from "../api/api";
import UserAttendance from "../reusable/components/UserAttendance";

export default function Attendance() {
  const [attendance, attendanceSet] = useState([]);
  console.log(attendance);
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
      {attendance.slice().map((attendance, i) => (
        <UserAttendance key={i} attendance={attendance}></UserAttendance>
      ))}
    </div>
  );
}
