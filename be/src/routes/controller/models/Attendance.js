import mongoose from "mongoose";

const { Schema } = mongoose;
const attendanceSchema = new Schema({
  No: { type: String, unique: true },
  DevNo: { type: String },
  UserId: { type: String },
  Name: { type: String },
  Mode: { type: String },
  DateTime: { type: String },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
