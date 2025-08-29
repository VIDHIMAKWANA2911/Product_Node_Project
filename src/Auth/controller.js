const bcrypt = require("bcrypt");
const User = require("../Users/model");

const register = async (req, res) => {
  try {
    const { userName, password, contactNo, email } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ msg: "Please required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      password: hashedPassword,
      contactNo,
      email,
    });

    return res.status(201).json({ msg: "User created", data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [{ userName: identifier }, { email: identifier }],
    });

    if (!user) return res.status(404).json({ msg: "User not found" });


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Password incorrect" });

    // session create
    req.session.user = {
      id: user._id,
      userName: user.userName,
      email: user.email,
    };

    return res
      .status(200)
      .json({
        msg: "User logged in successfully",
        data: { userName: user.userName, email: user.email },
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "login your account" });
  }
};

const logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Logout failed", error: err });
      }
      return res.json({ msg: "User logged out successfully" });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error });
  }
};

module.exports = { register, login, logout };
