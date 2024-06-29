import User from "./models/User.js";
import Test from "./models/Test.js";
import { location } from "../../utils/multer.js";
import {
  deleter,
  getter,
  getters,
  patcher,
  poster,
} from "../../utils/beHelpers.js";

export function getUsers(req, res) {
  getters(res, User, "Users");
}

export function getUser(req, res) {
  getter(req, res, User, "User");
}

export function apiUserPostUser(req, res) {
  poster(req, res, User, "User");
}

export async function apiUserPatchUser(req, res) {
  patcher(req, res, User, "User");
}

export async function apiUserDeleteUser(req, res) {
  deleter();
}

export async function apiPostTest(req, res) {
  const { name } = req.body;
  try {
    const test = await Test.create({
      image: "http://localhost:8000/uploads/images/" + req.file.filename,
      name,
    });
    return res.status(200).send(test);
  } catch (error) {
    deleteImage(req.file.path);
    return res.status(500).send(error.message);
  }
}

export async function apiPatchTest(req, res) {
  const { name } = req.body;
  const { userId } = req.params;
  try {
    const userPrevImg = await Test.findById(userId);

    if (!userPrevImg) return res.status(404).send("User not found");

    const imageUrl = userPrevImg.image.substring(
      userPrevImg.image.lastIndexOf("/") + 1
    );
    deleteImage(location + "/" + imageUrl);

    const test = await Test.findByIdAndUpdate(userId, {
      image: "http://localhost:8000/uploads/images/" + req.file.filename,
      name,
    });
    return res.status(200).send(test);
  } catch (error) {
    deleteImage(req.file.path);
    return res.status(500).send(error.message);
  }
}
