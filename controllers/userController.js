const User = require("../models/User");

const getAllUsers = (redisClient) => async (req, res) => {
  try {
    const usersCache = await redisClient.get("users");
    if (usersCache) {
      return res.status(200).json(JSON.parse(usersCache));
    } else {
      const users = await User.find();
      redisClient.set("users", JSON.stringify(users), "EX", 60); // Cache for 60 seconds
      return res.status(200).json(users);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const createUser = (redisClient) => async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();

    redisClient.del("users"); // Clear cache
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUser = (redisClient) => async (req, res) => {
  try {
    const cachedUser = await redisClient.get(`user:${req.params.id}`);

    if (cachedUser) {
      return res.status(200).json(JSON.parse(cachedUser));
    } else {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      redisClient.set(`user:${user._id}`, JSON.stringify(user), "EX", 60); // Cache for 60 seconds
      res.status(200).json(user);
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateUser = (redisClient) => async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    redisClient.del("users"); // Clear all user cache
    redisClient.set(
      `user:${updatedUser._id}`,
      JSON.stringify(updatedUser),
      "EX",
      60
    ); // Cache for 60 seconds
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = (redisClient) => async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    redisClient.del("users"); // Clear all user cache
    redisClient.del(`user:${deletedUser._id}`); // Clear individual user cache
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
