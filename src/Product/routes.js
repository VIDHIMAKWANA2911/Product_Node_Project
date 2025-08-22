const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const {
  getAll,
  getOne,
  create,
  updateOne,
  deleteOne} = require("./controller");

router.get("/", getAll);            
router.get("/:id", getOne);        
router.put("/:id", updateOne);       
router.delete("/:id", deleteOne);    
router.post("/", upload.single("Image"), create);


module.exports = router;
