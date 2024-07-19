import mongoose from "mongoose";

const { Schema } = mongoose;
const scheduleSchema = new Schema({
  schedule: [
    {
      date: { type: String },
      timeIn: { type: String },
      timeOut: { type: String },
      confirmUserId: { type: String },
    },
  ],
});
const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
