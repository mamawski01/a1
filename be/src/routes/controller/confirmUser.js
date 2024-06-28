import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { location } from "../../utils/multer.js";
import { deleteImage } from "../../utils/beHelpers.js";
import ConfirmUser from "./models/ConfirmUser.js";

export async function getConfirmUsers(req, res) {
  try {
    const confirmUsers = await ConfirmUser.find();
    if (!confirmUsers) return res.status(404).send("ConfirmUsers not found");
    return res.status(200).send({ confirmUsers });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "apiconfirmUsers Error" });
  }
}

export async function getConfirmUser(req, res) {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    console.log(user.firstName);
    if (!user) return res.status(404).send("User not found");
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "apiUserUserId Error" });
  }
}
