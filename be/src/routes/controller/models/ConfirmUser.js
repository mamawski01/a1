import mongoose from "mongoose";
import { schemaModel } from "../../../utils/beHelpers.js";

const { Schema } = mongoose;
const confirmUserSchema = new Schema(schemaModel());

const ConfirmUser = mongoose.model("ConfirmUser", confirmUserSchema);

export default ConfirmUser;
