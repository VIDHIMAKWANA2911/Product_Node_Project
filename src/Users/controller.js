const User = require("./model");

// 1. Get All Users
const getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users, msg: "All Users" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// 2. Get One User
const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    return res.json({ user, msg: "User Found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// 3. Create User
const createOne = async (req, res) => {
  try {
    const { userName, password, contactNo, email } = req.body;
    if (!userName || !password || !email) {
      return res.status(400).json({ msg: "Please provide required fields" });
    }
    const user = await User.create({ userName, password, contactNo, email });
    res.status(201).json({ msg: "User Created", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// 4. Update User
const updateOne = async (req, res) => {
  try {
    const id = req.params.id;
    const { userName, password, contactNo, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { userName, password, contactNo, email },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ msg: "User not found" });
    res.json({ msg: "User updated successfully", data: updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// 5. Delete User
const deleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ msg: "User not found" });
    res.json({ msg: "User deleted successfully", data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { getAll, getOne, createOne, updateOne, deleteOne };
