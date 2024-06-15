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
      birthdate,
      email,
      SSS,
      PagIbig,
      PhilHealth,
      TIN,
      contactPersonNameInEmergency,
      contactPersonNumberInEmergency,
    } = req.body;

    const userEmailExist = await User.exists({ email });
    if (userEmailExist) {
      return res.status(409).send("Email already exists");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      middleName,
      lastName,
      position,
      street,
      purok,
      brgy,
      city,
      province,
      country,
      contactNumber1,
      contactNumber2,
      contactNumber3,
      birthdate,
      email,
      SSS,
      PagIbig,
      PhilHealth,
      TIN,
      contactPersonNameInEmergency,
      contactPersonNumberInEmergency,
      password: encryptedPassword,
    });

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
