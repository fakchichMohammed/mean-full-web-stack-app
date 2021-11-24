const express = require("express");
const router = express.Router();
const cors = require("cors");

const Post = require("../models/post");
router.options("/api/posts/:id", cors());


router.post("", (request, response, next) => {
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
  
  router.put("/:id", cors(), (request, response, next) => {
    const post = new Post({
      _id: request.body.id,
      title: request.body.title,
      content: request.body.content,
    });
    Post.updateOne({_id: request.params.id}, post).then(result => {
      response.status(200).json({
        message: "Post updated successfully"
      });
    });
  });
  
  router.get("", (request, response, next) => {
    Post.find().then((documents) => {
      response.status(200).json({
        message: "Posts fetched successfully!",
        posts: documents,
      });
    });
  });
  
  router.get("/:id", (request, response, next) => {
    Post.findById(request.params.id).then(post => {
      if(post){
        response.status(200).json(post);
      }else {
        response.status(400).json({
          message: "Post not found",
        });
      }
    });
  })
  
  router.delete("/:id", cors(), (request, response, next) => {
    Post.deleteOne({ _id: request.params.id }).then((result) => {
      console.log(result);
      response.status(200).json({
        message: "Post deleted successfully!",
      });
    });
  });

  module.exports = router;