const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const Post = require("./models/post");
const app = express();

mongoose
  .connect(
    "mongodb+srv://mohammed:Mongodb.com92@cluster0.rlck1.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.options("/api/posts/:id", cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  response.setHeader(
    "Access-Allow-control-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.post("/api/posts", (request, response, next) => {
  const post = new Post({
    title: request.body.title,
    content: request.body.content,
  });
  post.save().then((result) => {
    response.status(201).json({
      message: "Post added successfully!",
      postId: result._id,
    });
  });
});

app.get("/api/posts", (request, response, next) => {
  Post.find().then((documents) => {
    response.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents,
    });
  });
});

app.delete("/api/posts/:id", cors(), (request, response, next) => {
  Post.deleteOne({ _id: request.params.id }).then((result) => {
    console.log(result);
    response.status(200).json({
      message: "Post deleted successfully!",
    });
  });
});

module.exports = app;
