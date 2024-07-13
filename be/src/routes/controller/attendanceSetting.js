import AttendanceSetting from "./models/AttendanceSetting.js";
import { getter, poster } from "./operators.js";

export async function apiAttendanceSetting(req, res) {
  getter(req, res, AttendanceSetting, "AttendanceSetting", true);
}

export async function apiAttendanceSettingPost(req, res) {
  poster(req, res, AttendanceSetting, "apiAttendanceSettingPost", true);
}

export async function apiAttendanceSettingPatch(req, res) {
  const { id } = req.params;
  try {
    const data = await AttendanceSetting.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!data) return res.status(404).send("Settings not found");
    return res.status(200).send({ message: "Settings updated", data });
  } catch (error) {
    return res.status(500).send("apiAttendanceSettingPatch Error");
  }
}
