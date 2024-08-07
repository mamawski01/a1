import fs from "fs";
import bcrypt from "bcryptjs";

import { location } from "./multer.js";

export function deleteImage(path) {
  if (!path) return null;
  return fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("File deleted successfully.");
    }
  });
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
    delImgPath || (req.file.path && deleteImage(req.file.path));
    return { success: false, sucMess: "User not found" };
  }
  const imageUrl = prevImg.image.substring(prevImg.image.lastIndexOf("/") + 1);
  setTimeout(() => {
    deleteImage(location + "/" + imageUrl);
  }, 1000);
  return { success: true };
}
