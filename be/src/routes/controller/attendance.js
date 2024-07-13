import Attendance from "./models/Attendance.js";
import { getter, poster } from "./operators.js";

export async function apiAttendances(req, res) {
  getter(req, res, Attendance, "ConfirmUsers", false);
}

export async function apiAttendancesPost(req, res) {
  poster(req, res, Attendance, "apiAttendancesPost");
}
