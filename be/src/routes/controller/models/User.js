import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  cellphoneNumbers: {
    type: [String],
  },
  password: { type: String },
  birthdate: { type: String },
  email: { type: String },
});

export default mongoose.model("User", userSchema);
