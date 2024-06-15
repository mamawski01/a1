import User from "./models/User.js";

export default async function getUser(req, res) {
  const { userId } = req.params;
  try {
    const users = await User.findById(userId);
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
  }
}
