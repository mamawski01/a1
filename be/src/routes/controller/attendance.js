import { getters } from "../../utils/beHelpers.js";
import Attendance from "./models/Attendance.js";

export async function apiAttendances(req, res) {
  getters(res, Attendance, "ConfirmUsers");
}

export async function apiAttendancesPost(req, res) {
  try {
    const data = await Attendance.insertMany(req.body);
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
