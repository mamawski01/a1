import AttendanceSetting from "./models/AttendanceSetting.js";
import { getter, patcher, poster } from "./operators.js";

export async function apiAttendanceSetting(req, res) {
  getter(req, res, AttendanceSetting, "AttendanceSetting", true);
}

export async function apiAttendanceSettingPost(req, res) {
  poster(req, res, AttendanceSetting, "apiAttendanceSettingPost", true);
}

export async function apiAttendanceSettingPatch(req, res) {
  patcher(req, res, AttendanceSetting, "apiAttendanceSettingPatch", true);
}
