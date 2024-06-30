import User from "./models/User.js";
import Test from "./models/Test.js";
import {
  deleteImage,
  getter,
  getters,
  passwordEncrypt,
  prevImgAndDelImg,
  url,
  userEmailAndDelImage,
} from "../../utils/beHelpers.js";

export function getUsers(req, res) {
  getters(res, User, "Users");
}

export function getUser(req, res) {
  getter(req, res, User, "User");
}

export async function apiUserPostUser(req, res) {
  const { email, password } = req.body;
  try {
    //check if email exist and delete image
    const { conflict, conflictMess } = await userEmailAndDelImage(
      req,
      email,
      User,
      true
    );
    if (conflict) {
      return res.status(409).send(conflictMess);
    }

    //encrypt password
    const encryptedPassword = await passwordEncrypt(password);

    const data = await User.create({
      ...req.body,
      password: encryptedPassword,
      repeatPassword: encryptedPassword,
      image: url + req.file.filename,
    });
    return res.status(200).send({ data });
  } catch (error) {
    deleteImage(req.file.path);
    return res.status(500).send(error.message);
  }
}

export async function apiUserPatchUser(req, res) {
  const { email, password } = req.body;
  const { id } = req.params;
  try {
    //check if email exist and delete image
    const { conflict, conflictMess } = await userEmailAndDelImage(
      req,
      email,
      User,
      true
    );
    if (conflict) {
      return res.status(409).send(conflictMess);
    }
    //check if email exist and delete image

    //encrypt password
    const encryptedPassword = await passwordEncrypt(password);
    //encrypt password

    //userPrevImg
    const { success, mess } = prevImgAndDelImg(req, User, id, true);
    if (success) return res.status(404).send(mess);
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
    const { conflict, conflictMess } = await userEmailAndDelImage(
      req,
      email,
      User,
      true
    );
    if (conflict) {
      return res.status(409).send(conflictMess);
    }
    //check if email exist and delete image

    //userPrevImg
    const { success, mess } = prevImgAndDelImg(req, User, id, true);
    if (success) return res.status(404).send(mess);
    //userPrevImg

    const data = await User.findByIdAndDelete(id);
    if (!data) return res.status(404).send("User not found");
    return res.status(200).send({ message: "User deleted", data });
  } catch (error) {
    console.log(error);
    return res.status(500).send("deleteUser Error");
  }
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
