const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();

const app = express();
app.use(express.json());

// session config
app.use(
  session({
    secret: "SECRET KEY",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: "mongodb://localhost:27017/Product_Node",
      ttl: 14 * 24 * 60 * 60,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Google auth user function
const GoogleauthUser = (accessToken, refreshToken, profile, done) => {
  console.log("Google Profile:", profile);
  done(null, profile);
}

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    GoogleauthUser
  )
);

// serialize / deserialize
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Google login
app.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get("/auth/google/callback", passport.authenticate("google", {
     successRedirect: '/dashboard',
     failureRedirect: '/fail',
  })
);

// Middleware for checking auth
const AuthUser = (req,res,next) => {
    try {
       if (req.isAuthenticated()) {
      return next();
    }
        if (!(req.session?.user)) {
            return res.status(401).json({ msg: "Please login " });
        }
        req.user = req.session.user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }   
}


app.use("/dashboard" , AuthUser , (req , res) => {
  console.log(req.user)
  res.send("Dashboard")
})

// Failed route
app.get("/failed", (req, res) => {
  res.send("Failed to login with Google");
});

// Test
app.get("/test", (req, res) => {
  res.json({ msg: "hello Universal", env: process.env.TEST });
});

// Static + Routes
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
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});



