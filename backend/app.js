const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const Post = require("./models/post");
app.options("/api/posts/:id", cors());

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

mongoose
  .connect(
    "mongodb+srv://mohammed:Mongodb.com92@cluster0.rlck1.mongodb.net/node-angular"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
