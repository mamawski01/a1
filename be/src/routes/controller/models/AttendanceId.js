import mongoose from "mongoose";

const { Schema } = mongoose;
const attendanceIdSchema = new Schema({
  attendanceId: { type: String },
});

const AttendanceId = mongoose.model("AttendanceId", attendanceIdSchema);

export default AttendanceId;
