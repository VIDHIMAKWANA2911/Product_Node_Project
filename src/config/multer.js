const multer = require("multer");
const Path = require("path");

// Configure multer for file uploads
// const upload = multer();
// const upload = multer({dest: "./public/Images"});

const storge = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,Path.join(__dirname,"..","..","Public","Images"))
    },
    filename:(req,file,cb)=>{
        const profix =Date.now() + "-" + Math.ceil(Math.random() * 10000000);
        cb(null, profix + "-" + file.originalname)
    }
})

const upload = multer({storage:storge})
module.exports = upload;

