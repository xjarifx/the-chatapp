import User from "../models/user.model.js";

// Add a new user
export const addUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Username and password are required" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).send({ message: "User already exists" });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
