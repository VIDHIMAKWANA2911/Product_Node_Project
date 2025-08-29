const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const MongoStore = require("connect-mongo");

const app = express();
app.use(express.json());

app.use(
  session({
    secret: "SECRET KEY",
    resave: false,
    saveUninitialized: false, 
    store:new MongoStore({
      mongoUrl: "mongodb://localhost:27017/Product_Node",
      ttl: 14 * 24 * 60 * 60, 
    }),
  })
);

// Routes
const productRoutes = require("./src/Product/routes");
const authRoutes = require("./src/Auth/routes");
const userRoutes = require("./src/Users/routes");

app.use("/Images", express.static(path.join(__dirname, "public/Images")));
app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// DB connect
mongoose
  .connect("mongodb://localhost:27017/Product_Node")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error(err));

const PORT = 8000;

app.get("/test", (req, res) => {
  res.json({ msg: "hello Universal", env: process.env.TEST });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
