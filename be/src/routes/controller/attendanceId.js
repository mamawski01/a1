import ConfirmUser from "./models/ConfirmUser.js";
import { getter, patcher } from "./operators.js";

export async function apiAttendanceId(req, res) {
  getter(req, res, ConfirmUser, "apiAttendanceId", true);
}

export async function apiAttendanceIdPatch(req, res) {
  patcher(req, res, ConfirmUser, "apiAttendanceIdPatch", true);
}
