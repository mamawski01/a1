import User from "./models/User.js";

export default async function deleteUser(req, res) {
  try {
    const { userId } = req.params;
    console.log(userId);

    const user = await User.findByIdAndDelete(userId);
    return res.status(200).json({
      message: "User deleted successfully",
      user: user._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to delete user" });
  }
}
