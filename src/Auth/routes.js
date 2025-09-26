const express = require("express");
const authUSer = require("./controller");  
const AuthUSer = require("../Auth/middleware");


const Route = express.Router();

Route.post("/register",AuthUSer, authUSer.register);
Route.post("/login", authUSer.login);
Route.post("/sendOTP" , authUSer.send_OTP);
Route.post("/verifyOTP" , authUSer.verified_OTP);
Route.post("/forgotpassword" , authUSer.forgotpassword);
Route.post("/resetpassword",authUSer.resetpassword);
Route.post("/logout", authUSer.logout);

module.exports = Route;
