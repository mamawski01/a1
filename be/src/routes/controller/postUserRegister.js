import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "./models/User.js";

export default async function postUserRegister(req, res) {
  try {
    const {
      firstName,
      lastName,
      address,
      cellphoneNumbers,
      password,
      repeat_password,
      birthdate,
      email,
    } = req.body;

    const userEmailExist = await User.exists({ email });
    if (userEmailExist) {
      return res.status(409).send("Email already exists");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      address,
      cellphoneNumbers,
      password: encryptedPassword,
      repeat_password,
      birthdate,
      email,
    });
    console.log(user);

    const token = jwt.sign(
      //user details
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

    return res.status(200).json({
      userDetails: {
        firstName: firstName,
        token: token,
      },
    });
  } catch (error) {
    console.log(error.message + "error on postUserRegister.js");
    return res
      .status(500)
      .send("Internal Server Error" + "error on postUserRegister.js");
  }
}
