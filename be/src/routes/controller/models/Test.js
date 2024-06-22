import mongoose from "mongoose";

const { Schema } = mongoose;
const testSchema = new Schema({
  image: { type: String, required: [true, "Image is required."] },
  name: { type: String, required: [true, "Name is required."] },
});

const Test = mongoose.model("Test", testSchema);

export default Test;
