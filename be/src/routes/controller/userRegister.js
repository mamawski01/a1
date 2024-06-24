import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";

import User from "./models/User.js";
import Test from "./models/Test.js";
import { location } from "../multer.js";

function deleteImage(path) {
  return fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("File deleted successfully.");
    }
  });
}

export async function getUsers(req, res) {
  try {
    const users = await User.find();
    if (!users) return res.status(404).send("Users not found");
    return res.status(200).send({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "apiUsers Error" });
  }
}

export async function getUser(req, res) {
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

export async function apiUserPostUser(req, res) {
  const {
    firstName,
    middleName,
    lastName,
    position,
    birthdate,
    email,
    street,
    purok,
    brgy,
    city,
    province,
    country,
    contactNumber1,
    contactNumber2,
    contactNumber3,
    password,
    SSS,
    PagIbig,
    PhilHealth,
    TIN,
    contactPersonNameInEmergency,
    contactPersonNumberInEmergency,
  } = req.body;
  try {
    const userEmailExist = await User.exists({ email });
    if (userEmailExist) {
      deleteImage(req.file.path);
      return res.status(409).send("Email already exists");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      middleName,
      lastName,
      position,
      birthdate,
      email,
      street,
      purok,
      brgy,
      city,
      province,
      country,
      contactNumber1,
      contactNumber2,
      contactNumber3,
      password: encryptedPassword,
      SSS,
      PagIbig,
      PhilHealth,
      TIN,
      contactPersonNameInEmergency,
      contactPersonNumberInEmergency,
      image: "http://localhost:8000/uploads/images/" + req.file.filename,
    });

    const token = jwt.sign(
      // user details
      {
        userId: user._id,
        firstName: user.firstName,
      },
      //secret key
      process.env.TOKEN_KEY,
      //additional options
      {
        expiresIn: "8h",
      }
    );

    return res.status(200).send({
      userDetails: {
        firstName: firstName,
        token: token,
      },
    });
  } catch (error) {
    deleteImage(req.file.path);
    return res.status(500).send(error.message);
  }
}

export async function apiUserPatchUser(req, res) {
  const { userId } = req.params;

  try {
    const userPrevImg = await User.findById(userId);
    console.log(userPrevImg.image);

    // deleteImage(userPrevImg.image);
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!user) return res.status(404).send("User not found");
    return res.status(200).send({ message: "User updated", user });
  } catch (error) {
    console.log(error);
    return res.status(500).send("apiUpdateUserUserId Error");
  }
}

export async function apiUserDeleteUser(req, res) {
  const { userId } = req.params;
  try {
    const userPrevImg = await User.findById(userId);
    const imageUrl = userPrevImg.image.substring(
      userPrevImg.image.lastIndexOf("/") + 1
    );
    deleteImage(location + "/" + imageUrl);
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).send("User not found");
    return res.status(200).send({ message: "User deleted", user });
  } catch (error) {
    console.log(error);
    return res.status(500).send("deleteUser Error");
  }
}

export async function apiTest(req, res) {
  const { name } = req.body;
  console.log(req.file);
  try {
    const test = await Test.create({
      image: "http://localhost:8000/uploads/images/" + req.file.filename,
      name,
    });
    console.log(test);
    return res.status(200).send(req.file);
  } catch (error) {
    deleteImage(req.file.path);
    return res.status(500).send(error.message);
  }
}
