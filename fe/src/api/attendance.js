import { updateRealtimeAttendance } from "../feIo/feIo";
import { getter, poster } from "./operators";

//attendance
export async function apiAttendances() {
  return getter(
    "All Attendance fetched",
    "/apiAttendances",
    updateRealtimeAttendance,
    false,
  );
}

export async function apiAttendancesPost(attendance) {
  return poster(
    "New Attendance created",
    "/apiAttendancesPost",
    attendance,
    true,
  );
}
