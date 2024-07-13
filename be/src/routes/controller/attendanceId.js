import ConfirmUser from "./models/ConfirmUser.js";
import { getter } from "./operators.js";

export async function apiAttendanceId(req, res) {
  getter(req, res, ConfirmUser, "apiAttendanceId", true);
}

export async function apiAttendanceIdPatch(req, res) {
  const { id } = req.params;
  try {
    const data = await ConfirmUser.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!data) return res.status(404).send("User not found");
    return res.status(200).send({ message: "User updated", data });
  } catch (error) {
    return res.status(500).send("apiAttendanceIdPatch Error");
  }
}
