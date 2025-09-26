const express = require("express");
const Users = require("./controller");
const auth = require("../Auth/middleware");

const routes = express.Router();

routes.get("/",auth, Users.getAll);
routes.get("/:index", Users.getOne);
routes.post("/", Users.createOne)
routes.delete("/:index", Users.deleteOne );
routes.put("/:index", Users.updateOne)

module.exports = routes;
