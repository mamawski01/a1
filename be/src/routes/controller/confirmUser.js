import {
  deleteImage,
  prevImgAndDelImg,
  userEmailAndDelImage,
} from "../../utils/beHelpers.js";
import ConfirmUser from "./models/ConfirmUser.js";
import User from "./models/User.js";
import { getter, poster } from "./operators.js";

export async function apiConfirmUsers(req, res) {
  getter(req, res, ConfirmUser, "ConfirmUsers", false);
}

export async function apiConfirmUser(req, res) {
  getter(req, res, ConfirmUser, "ConfirmUser", true);
}

export async function apiConfirmUserPost(req, res) {
  poster(req, res, ConfirmUser, "apiConfirmUserPost", false, User);
}

export async function apiConfirmUserPatchUser(req, res) {
  const { id } = req.params;
  try {
    //userPrevImg
    const { success, sucMess } = prevImgAndDelImg(req, ConfirmUser, id);
    if (success) return res.status(404).send(sucMess);
    //userPrevImg

    const data = await ConfirmUser.findByIdAndUpdate(
      id,
      {
        ...req.body,
        image: "http://localhost:8000/uploads/images/" + req.file.filename,
      },
      { new: true }
    );

    if (!data) return res.status(404).send("User not found");

    return res.status(200).send({ message: "User updated", data });
  } catch (error) {
    console.log(error);
    deleteImage(req.file.path);
    return res.status(500).send("apiConfirmUserPatchUser Error");
  }
}

export async function apiConfirmUserDelete(req, res) {
  const { id } = req.params;
  try {
    //userPrevImg
    const { success, sucMess } = prevImgAndDelImg(req, ConfirmUser, id, false);
    if (success) return res.status(404).send(sucMess);
    //userPrevImg

    const data = await ConfirmUser.findByIdAndDelete(id);
    if (!ConfirmUser) return res.status(404).send("User not found");
    return res.status(200).send({ message: "User deleted", data });
  } catch (error) {
    console.log(error);
    return res.status(500).send("deleteUser Error");
  }
}
