import fs from "fs";
import bcrypt from "bcryptjs";

import { location } from "./multer.js";

export function deleteImage(path) {
  return fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("File deleted successfully.");
    }
  });
}

export function schemaModel() {
  return {
    firstName: { type: String, required: [true, "First Name is required."] },
    middleName: { type: String, required: [true, "Middle Name is required."] },
    lastName: { type: String, required: [true, "Last Name is required."] },
    position: { type: String, required: [true, "Position is required."] },
    birthdate: { type: String, required: [true, "Birthdate is required."] },
    employmentDate: {
      type: String,
      required: [true, "Birthdate is required."],
    },
    email: { type: String, unique: true },
    street: { type: String },
    purok: { type: String },
    brgy: { type: String, required: [true, "Barangay is required."] },
    city: { type: String, required: [true, "City is required."] },
    province: { type: String, required: [true, "Province is required."] },
    country: { type: String, required: [true, "Country is required."] },
    contactNumber1: {
      type: String,
      required: [true, "1 Contact Number is required."],
    },
    contactNumber2: { type: String },
    contactNumber3: { type: String },
    password: { type: String },
    repeatPassword: { type: String },
    SSS: { type: String },
    PagIbig: { type: String },
    PhilHealth: { type: String },
    TIN: { type: String },
    contactPersonNameInEmergency: {
      type: String,
      required: [true, "Contact Person Name In Emergency is required."],
    },
    contactPersonNumberInEmergency: {
      type: String,
      required: [true, "Contact Person Number In Emergency is required."],
    },
    image: { type: String, required: [true, "Image is required."] },
  };
}

export const url = "http://localhost:8000/uploads/images/";

export async function passwordEncrypt(password) {
  return await bcrypt.hash(password, 10);
}

export async function userEmailAndDelImage(
  req,
  email,
  model,
  delImgPath = true
) {
  if (!email) return { conflict: false };

  const userEmailExist = await model.exists({ email });
  if (userEmailExist) {
    delImgPath && deleteImage(req.file.path);
    return { conflict: true, confMess: "Email already exists" };
  }
  return { conflict: false };
}

export async function prevImgAndDelImg(req, model, id, delImgPath = true) {
  const prevImg = await model.findById(id);
  if (!prevImg) {
    delImgPath && deleteImage(req.file.path);
    return { success: false, sucMess: "User not found" };
  }
  const imageUrl = prevImg.image.substring(prevImg.image.lastIndexOf("/") + 1);
  deleteImage(location + "/" + imageUrl);
  return { success: true };
}

export async function getters(res, model, mess) {
  try {
    const data = await model.find();
    if (!data) return res.status(404).send(`${mess} not found`);
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).send(error.message + mess);
  }
}

export async function getter(req, res, model, mess) {
  const { id } = req.params;
  try {
    const data = await model.findById(id);
    if (!data) return res.status(404).send(`${mess} not found`);
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).send(error.message + mess);
  }
}
