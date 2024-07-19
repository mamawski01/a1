import mongoose from "mongoose";

import { schemaModel } from "./schemaModel.js";

const { Schema } = mongoose;
const confirmUserSchema = new Schema({
  ...schemaModel(),
  attendanceId: { type: String },
  schedules: {
    type: Schema.Types.ObjectId,
    ref: "ScheduleSchema",
  },
});
const ConfirmUser = mongoose.model("ConfirmUser", confirmUserSchema);

export default ConfirmUser;
