import User from "./models/User.js";
import {
  deleteImage,
  passwordEncrypt,
  prevImgAndDelImg,
  url,
  userEmailAndDelImage,
} from "../../utils/beHelpers.js";
import { getter, poster } from "./operators.js";

export function apiUsers(req, res) {
  getter(req, res, User, "Users", false);
}

export function apiUser(req, res) {
  getter(req, res, User, "User", true);
}

export async function apiUserPostUser(req, res) {
  poster(req, res, User, "apiUserPostUser", false);
}

export async function apiUserPatchUser(req, res) {
  const { email, password } = req.body;
  const { id } = req.params;
  try {
    //check if email exist and delete image
    const { conflict, confMess } = await userEmailAndDelImage(req, email, User);
    if (conflict) return res.status(409).send(confMess);
    //check if email exist and delete image

    //encrypt password
    const encryptedPassword = await passwordEncrypt(password);
    //encrypt password

    //userPrevImg
    const { success, sucMess } = prevImgAndDelImg(req, User, id, true);
    if (success) return res.status(404).send(sucMess);
    //userPrevImg

    const data = await User.findByIdAndUpdate(
      id,
      {
        ...req.body,
        password: encryptedPassword,
        repeatPassword: encryptedPassword,
        image: url + req.file.filename,
      },
      { new: true }
    );

    if (!data) return res.status(404).send("User not found");
    return res.status(200).send({ message: "User updated", data });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function apiUserDeleteUser(req, res) {
  const { id } = req.params;
  try {
    //check if email exist and delete image
    const { conflict, confMess } = await userEmailAndDelImage(req, false, User);
    if (conflict) return res.status(409).send(confMess);
    //check if email exist and delete image

    //userPrevImg
    const { success, sucMess } = prevImgAndDelImg(req, User, id, true);
    if (success) return res.status(404).send(sucMess);
    //userPrevImg

    const data = await User.findByIdAndDelete(id);
    if (!data) return res.status(404).send("User not found");
    return res.status(200).send({ message: "User deleted", data });
  } catch (error) {
    console.log(error);
    return res.status(500).send("deleteUser Error");
  }
}
