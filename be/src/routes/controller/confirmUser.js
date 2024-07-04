import {
  getter,
  getters,
  prevImgAndDelImg,
  userEmailAndDelImage,
} from "../../utils/beHelpers.js";
import ConfirmUser from "./models/ConfirmUser.js";
import User from "./models/User.js";

export async function apiConfirmUsers(req, res) {
  getters(res, ConfirmUser, "ConfirmUsers");
}

export async function apiConfirmUser(req, res) {
  getter(req, res, ConfirmUser, "ConfirmUser");
}

export async function apiConfirmUserPost(req, res) {
  const { email, _id } = req.body;
  try {
    //check if email exist and delete image
    const { conflict, confMess } = await userEmailAndDelImage(
      req,
      email,
      ConfirmUser,
      false
    );
    if (conflict) return res.status(409).send(confMess);
    //check if email exist and delete image

    const user = await User.findByIdAndDelete(_id);
    if (!user) return res.status(404).send("User not found");
    const data = await ConfirmUser.create(req.body);
    return res.status(200).send(data._id);
  } catch (error) {
    return res.status(500).send(error.message);
  }
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
