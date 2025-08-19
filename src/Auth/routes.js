const express = require("express");
const authUSer = require("./controller");  

const Route = express.Router();

Route.post("/register", authUSer.register);
Route.post("/login", authUSer.login);
Route.post("/logout", authUSer.logout);

module.exports = Route;
