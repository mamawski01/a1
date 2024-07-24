import mongoose from "mongoose";

const { Schema } = mongoose;
const attendanceSettingSchema = new Schema({
  breakTime: { type: String },
  regularRating: { type: String },
  holidayRatingRegular: { type: String },
  holidayRatingSpecial: { type: String },
  regularDutyHours: { type: String },
  overtimeStarts: { type: String },
});

const AttendanceSetting = mongoose.model(
  "AttendanceSetting",
  attendanceSettingSchema
);

export default AttendanceSetting;
