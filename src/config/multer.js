const multer = require("multer");

// Configure multer for file uploads
// const upload = multer();
const upload = multer({dest: "./public/Images"});



module.exports = upload;