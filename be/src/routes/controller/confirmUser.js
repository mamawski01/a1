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
  const { email } = req.body;
  const { confirmUserId } = req.params;
  try {
    const confirmUserEmailExist = await ConfirmUser.exists({ email });
    if (confirmUserEmailExist) {
      return res.status(409).send("Email already exists");
    }

    const confirmUser = await ConfirmUser.findByIdAndUpdate(
      confirmUserId,
      req.body,
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
