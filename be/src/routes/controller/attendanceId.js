import { getter, getters } from "../../utils/beHelpers.js";
import AttendanceId from "./models/AttendanceId.js";

export async function apiAttendanceIds(req, res) {
  getters(res, AttendanceId, "apiAttendanceIds");
}

export async function apiAttendanceId(req, res) {
  getter(req, res, AttendanceId, "apiAttendanceId");
}

export async function apiAttendanceIdPost(req, res) {
  try {
    const data = await AttendanceId.create(req.body);
    return res.status(200).send(data._id);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function apiAttendanceIdPatch(req, res) {
  const { id } = req.params;
  try {
    const data = await AttendanceId.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!data) return res.status(404).send("User not found");
    return res.status(200).send({ message: "User updated", data });
  } catch (error) {
    return res.status(500).send("apiAttendanceIdPatch Error");
  }
}
