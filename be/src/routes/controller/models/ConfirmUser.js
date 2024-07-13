import mongoose from "mongoose";

import { schemaModel } from "./schemaModel.js";

const { Schema } = mongoose;
const confirmUserSchema = new Schema({
  ...schemaModel(),
  attendanceId: { type: String },
});
const ConfirmUser = mongoose.model("ConfirmUser", confirmUserSchema);

export default ConfirmUser;
