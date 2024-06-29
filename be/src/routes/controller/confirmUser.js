import { deleteImage } from "../../utils/beHelpers.js";
import { location } from "../../utils/multer.js";
import ConfirmUser from "./models/ConfirmUser.js";
import User from "./models/User.js";

export async function getConfirmUsers(req, res) {
  try {
    const confirmUsers = await ConfirmUser.find();
    if (!confirmUsers) return res.status(404).send("ConfirmUsers not found");
    return res.status(200).send({ data: confirmUsers });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "apiconfirmUsers Error" });
  }
}

export async function getConfirmUser(req, res) {
  const { confirmUserId } = req.params;
  try {
    const confirmUser = await ConfirmUser.findById(confirmUserId);

    if (!confirmUser) return res.status(404).send("Confirm not found");
    return res.status(200).json({ data: confirmUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "apiConfirmUserId Error" });
  }
}

export async function apiConfirmUserPost(req, res) {
  const { email, _id } = req.body;
  try {
    const confirmUserEmailExist = await ConfirmUser.exists({ email });
    if (confirmUserEmailExist) {
      return res.status(409).send("Email already exists");
    }

    const user = await User.findByIdAndDelete(_id);
    if (!user) return res.status(404).send("User not found");
    const confirmUser = await ConfirmUser.create(req.body);
    return res.status(200).send(confirmUser._id);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function apiConfirmUserPatchUser(req, res) {
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
    repeatPasswordpassword,
    SSS,
    PagIbig,
    PhilHealth,
    TIN,
    contactPersonNameInEmergency,
    contactPersonNumberInEmergency,
  } = req.body;
  const { confirmUserId } = req.params;
  try {
    const confirmUserEmailExist = await ConfirmUser.exists({ email });
    if (confirmUserEmailExist) {
      deleteImage(req.file.path);
      return res.status(409).send("Email already exists");
    }

    const userPrevImg = await ConfirmUser.findById(confirmUserId);

    if (!userPrevImg) {
      deleteImage(req.file.path);
      return res.status(404).send("User not found");
    }

    const imageUrl = userPrevImg.image.substring(
      userPrevImg.image.lastIndexOf("/") + 1
    );

    deleteImage(location + "/" + imageUrl);

    const confirmUser = await ConfirmUser.findByIdAndUpdate(
      confirmUserId,
      {
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
        repeatPasswordpassword,
        SSS,
        PagIbig,
        PhilHealth,
        TIN,
        contactPersonNameInEmergency,
        contactPersonNumberInEmergency,
        image: "http://localhost:8000/uploads/images/" + req.file.filename,
      },
      {
        new: true,
      }
    );

    if (!confirmUser) return res.status(404).send("User not found");
    return res.status(200).send({ message: "User updated", confirmUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send("apiConfirmUserPatchUser Error");
  }
}

export async function apiConfirmUserDelete(req, res) {
  const { confirmUserId } = req.params;
  try {
    const userPrevImg = await ConfirmUser.findById(confirmUserId);
    const imageUrl = userPrevImg.image.substring(
      userPrevImg.image.lastIndexOf("/") + 1
    );
    deleteImage(location + "/" + imageUrl);
    const confirmUser = await ConfirmUser.findByIdAndDelete(confirmUserId);
    if (!ConfirmUser) return res.status(404).send("User not found");
    return res.status(200).send({ message: "User deleted", confirmUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send("deleteUser Error");
  }
}
