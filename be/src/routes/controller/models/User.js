import mongoose from "mongoose";

import { schemaModel } from "./schemaModel.js";

const { Schema } = mongoose;
const userSchema = new Schema(schemaModel());

const User = mongoose.model("User", userSchema);

export default User;
