import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema({
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
  position: { type: String },
  street: { type: String },
  purok: { type: String },
  brgy: { type: String },
  city: { type: String },
  province: { type: String },
  country: { type: String },
  contactNumber1: { type: String },
  contactNumber2: { type: String },
  contactNumber3: { type: String },
  password: { type: String },
  birthdate: { type: String },
  email: { type: String, unique: true },
  SSS: { type: String },
  PagIbig: { type: String },
  PhilHealth: { type: String },
  TIN: { type: String },
  contactPersonNameInEmergency: { type: String },
  contactPersonNumberInEmergency: { type: String },
});

export default mongoose.model("User", userSchema);
