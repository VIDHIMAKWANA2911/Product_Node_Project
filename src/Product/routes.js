const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const { AuthUSer } = require("../Auth/middleware");

const {
  getAll,
  getOne,
  create,
  updateOne,
  deleteOne
} = require("./controller");

router.get("/", getAll);            
router.get("/:id", getOne); 
router.post("/",create)       
router.put("/:id", updateOne);       
router.delete("/:id", deleteOne);    

router.post("/", AuthUSer, upload.single("Image"), create);

module.exports = router;
