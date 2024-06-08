import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "./models/User.js";

export default async function postUserRegister(req, res) {
  try {
    const {
      firstName,
      middleName,
      lastName,
      position,
      address,
      cellphoneNumbers,
      password,
      repeat_password,
      birthdate,
      email,
      SSS,
      Pag_Ibig,
      PhilHealth,
      TIN,
      contactPersonNameInEmergency,
      contactPersonNumberInEmergency,
      oneTimePassword,
    } = req.body;

    const userExist = await User.exists({ email });
    if (userExist) {
      return res.status(409).send("Email already exists");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      middleName,
      lastName,
      position,
      address,
      cellphoneNumbers,
      password: encryptedPassword,
      repeat_password,
      birthdate,
      email,
      SSS,
      Pag_Ibig,
      PhilHealth,
      TIN,
      contactPersonNameInEmergency,
      contactPersonNumberInEmergency,
      oneTimePassword,
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
