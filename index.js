const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");


const app = express();
app.use(express.json()); 

app.use(session({
  secret: "vidhi-secret-key",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

//  Import Routes
const productRoutes = require("./src/Product/routes");
const authRoutes = require("./src/Auth/routes");  

//  Use Routes
app.use("/products", productRoutes);
app.use("/auth", authRoutes);  
app.use("/images", express.static("public/images"));


// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/Product_Node")
  .then(() => console.log(" DB Connected"))
  .catch((err) => console.error(err));

// Server start
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
