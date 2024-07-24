import AttendanceSetting from "./models/AttendanceSetting.js";
import { getter, patcher, poster } from "./operators.js";

export async function apiAttendanceSettings(req, res) {
  getter(req, res, AttendanceSetting, "apiAttendanceSettings", false);
}

export async function apiAttendanceSetting(req, res) {
  getter(req, res, AttendanceSetting, "apiAttendanceSetting", true);
}

export async function apiAttendanceSettingPost(req, res) {
  poster(req, res, AttendanceSetting, "apiAttendanceSettingPost", "simple");
}

export async function apiAttendanceSettingPatch(req, res) {
  patcher(req, res, AttendanceSetting, "apiAttendanceSettingPatch", "simple");
}
