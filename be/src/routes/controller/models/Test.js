import mongoose from "mongoose";

const { Schema } = mongoose;
const testSchema = new Schema({
  image: { type: String, required: [true, "Image is required."] },
});

const Test = mongoose.model("Test", testSchema);

export default Test;
