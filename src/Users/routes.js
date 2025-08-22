const express = require("express");
const Users = require ("./Controller");
const AuthUSer = require ("../Auth/middleware");

const routes = express.Router()

//1.read All-
routes.get("/", Users.getAll);

//2.read One
routes.get("/:index", Users.getOne);

// 3. create
routes.post("/",Users.createOne)

//4.delete
routes.delete("/:index", Users.deleteOne );

//5.update
routes.put("/:index", Users.updateOne)


module.exports = routes;
