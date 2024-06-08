import User from "./models/User.js";

export default async function getUsers(req, res) {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
  }
}
