const User = require("./model");

// 1. Get All
const getAll = async (req, res) => {
  try {
    const users = await User.find();
    return res.json({ users, msg: "All Users Fetched" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// 2. Get One
const getOne = async (req, res) => {
  try {
    const id = req.params.index;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "User Not Found" });
    return res.json({ user, msg: "User Found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// 3. Create
const createOne = async (req, res) => {
  try {
    const { userName, password, contactNo, email } = req.body;
    const user = await User.create({ userName, password, contactNo, email });
    return res.status(201).json({ user, msg: "User Created Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// 4. Update
const updateOne = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ msg: "User Not Found" });
    return res.json({ updatedUser, msg: "User Updated Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// 5. Delete
const deleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ msg: "User Not Found" });
    return res.json({ deletedUser, msg: "User Deleted Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { getAll, getOne, createOne, updateOne, deleteOne };
