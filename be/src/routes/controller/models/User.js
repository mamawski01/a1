import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema({
  firstName: { type: String, required: [true, "Firstname is required"] },
  middleName: { type: String, required: [true, "MiddleName is required"] },
  lastName: { type: String, required: [true, "LastName is required"] },
  position: { type: String, required: [true, "Position is required"] },
  address: { type: String, required: [true, "Address is required"] },
  cellphoneNumbers: {
    type: [String],
    required: [true, "1  or more Cellphone numbers are required"],
  },
  password: { type: String, required: [true, "Password is required"] },
  repeat_password: {
    type: String,
    required: [true, "Repeat password is required"],
  },
  birthdate: { type: Date, required: [true, "Birthdate is required"] },
  email: { type: String, required: [true, "Email is required"], unique: true },
  SSS: { type: String, required: [true, "SSS is required"] },
  Pag_Ibig: { type: String, required: [true, "Pag-Ibig is required"] },
  PhilHealth: { type: String, required: [true, "PhilHealth is required"] },
  TIN: { type: String, required: [true, "TIN is required"] },
  contactPersonNameInEmergency: {
    type: String,
    required: [true, "Contact person name in emergency is required"],
  },
  contactPersonNumberInEmergency: {
    type: String,
    required: [true, "Contact person number in emergency is required"],
  },
  oneTimePassword: {
    type: String,
    required: [true, "One time password is required"],
  },
});

export default mongoose.model("User", userSchema);
