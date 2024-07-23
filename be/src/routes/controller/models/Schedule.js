import mongoose from "mongoose";

const { Schema } = mongoose;
const scheduleSchema = new Schema({
  confirmUserId: { type: String },
  schedule: [
    {
      date: { type: String },
      timeIn: { type: String },
      timeOut: { type: String },
    },
  ],
});
const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
