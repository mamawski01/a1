import { getters } from "../../utils/beHelpers.js";
import Attendance from "./models/Attendance.js";

export async function apiAttendances(req, res) {
  getters(res, Attendance, "ConfirmUsers");
}

export async function apiAttendancesPost(req, res) {
  const uniqueNo = new Set(req.body.map((item) => item.No));
  const existingNo = await Attendance.find({
    No: { $in: Array.from(uniqueNo) },
  });

  if (existingNo.length > 0) {
    const existingNoArray = existingNo.map((item) => item.No);

    const uniqueNoArray = Array.from(uniqueNo);

    const uniqueNonExistingNo = uniqueNoArray.filter(
      (no) => !existingNoArray.includes(no)
    );
    if (uniqueNonExistingNo.length > 0) {
      const filteredBody = req.body.filter((item) =>
        uniqueNonExistingNo.includes(item.No)
      );
      const data = await Attendance.insertMany(filteredBody);
      return res.status(200).send({ data });
    } else {
      return res.status(409).send("All No already exists");
    }
  } else {
    const data = await Attendance.insertMany(req.body);
    return res.status(200).send({ data });
  }
}
