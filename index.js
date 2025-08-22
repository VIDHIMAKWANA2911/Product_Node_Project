require
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); 

//  Import Routes
const productRoutes = require("./src/Product/routes");
const authRoutes = require("./src/Auth/routes");
const userRoutes = require("./src/Users/routes"); 
const path = require("path"); 


 app.use("/Images", express.static(path.join(__dirname, "public/Images")));


//  Use Routes
app.use("/products", productRoutes);
app.use("/auth", authRoutes);  
app.use("/users", userRoutes);

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/Product_Node")
  .then(() => console.log(" DB Connected"))
  .catch((err) => console.error(err));

// Server start
const PORT = 8000;

app.get("/test", (req,res)=>{
  res.json({msg:"hello Universal",env:process.env.TEST})
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

