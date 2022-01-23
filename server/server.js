const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");

// Load config
dotenv.config({ path: "./config/config.env" })
// Passport config
require("./config/passport")(passport);
connectDB();



const app = express();
// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'))
}

// cors 
app.use(cors({
  origin: true,
  credentials: true,
}))

// session middleware
app.use(session({
  secret: 'hunterxhunter',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ // store login information so server  refresh / tabclose presists COOKIE
    mongoUrl: process.env.MONGO_URI
  })
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// static folder 
// app.use(express.static())

// Routes
app.use("/", require("./routes/routes"))
app.use("/auth", require("./routes/auth"))



const PORT = process.env.PORT || 8000;

app.listen(
  PORT,
  () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  }) 