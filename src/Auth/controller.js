const bcrypt = require("bcrypt");
const User = require("../Users/model");
const saltRounds = process.env.bycrypt_solt;
const OTP_STORE = {}
const transporter = require("../config/mailer");
const jwt = require("jsonwebtoken");

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
    
    const token = jwt.sign(
      { id: user._id, userName: user.userName, email: user.email },
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }  
    );

    return res.status(200).json({
      msg: "User logged in successfully",
      token: token, 
      data: { userName: user.userName, email: user.email },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "login your account" });
  }
};

const resetpassword = async (req , res) => {
  const user_Id = req.user["id"]
  const  {password , new_password} = req.body
  if(!password || !new_password) return res.json({msg :"Password & New_password require"})

    const user = await User.findById(user_Id)
    if(!user) return res.status(404).json({msg:"user not found"})

      const  Match_password = bcrypt.compareSync(password , user.password)
      if(!Match_password) return res.json({msg: "please correct password "})

     user.password = bcrypt.hashSync(new_password , saltRounds)   
     await user.save();
     res.json({
      msg:"password Update Successfully"
     })
}

const send_OTP = async (req , res) => {
  try {
    const {email} = req.body;
    if(!email) return res.json({msg : "email require"});

    const is_USER = await User.exists({email : email});
    if (!is_USER) return res.json({msg:"not vaild Email_id"});

    function generateOTP(length = 6) {
      let otp = "";
      for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10); 
      }
      return otp;
    }

    const otp = generateOTP(6);

    OTP_STORE[email] = {otp : otp , Verified : false};

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,
    });

    return res.json({
      msg:"EMAIL sent successfully",
      otp: otp 
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({msg:"Failed to send OTP"});
  }
};

const verified_OTP = (req , res) => {
    const {email , otp } = req.body;

    if (!email) return res.json({msg : "email require....!!!! "})
      if(OTP_STORE[email]["otp"] !== otp) return res.json({msg : "wrong OTP"})

        OTP_STORE[email]["isVerified"] = true 
        res.json({msg : "OTP SUCCESSFULLY.....!!!!"})
}

const forgotpassword = async (req , res) => {
  const {email , password , again_Password} = req.body;

  if(!OTP_STORE[email]?.Verified) return res.json({msg:"you can not change password"})
    if(password != again_Password) return res.json({msg: "password does not match"})

      const user = await User.findOne({email : email})
      if(!user) return res.status(404).json({msg : "user not found"})
        
        user.password = bcrypt.hashSync(password , saltRounds)

        await user.save()

        delete OTP_STORE[email];
        res.json({msg:" password update successfully"})
}

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

module.exports = { register, login, logout , forgotpassword , resetpassword ,send_OTP , verified_OTP};
