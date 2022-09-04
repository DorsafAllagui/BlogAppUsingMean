const express = require('express')
const Post = require('../models/post')
const router = new express.Router()
const multer = require("multer");
const checkAuth = require("../middlewares/check-auth");
const mongoose = require('mongoose');

const url = "mongodb://testuser:9eVH8YT0rVZ0X1uj@cluster0-shard-00-00.ecaql.mongodb.net:27017,cluster0-shard-00-01.ecaql.mongodb.net:27017,cluster0-shard-00-02.ecaql.mongodb.net:27017/BLOGAPP?ssl=true&replicaSet=atlas-ceza4t-shard-0&authSource=admin&retryWrites=true&w=majority";











router.post("",

    (req, res, next) => {
      mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }, function(){
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            upvote: req.body.upvote,
            downvote : req.body.downvote
           
        })
        console.log(post)
        post.save().then(post => {
          if(post){
              res.status(201).json({
                  message: "Post added successfully",
                  post: {
                      ...post,
                      id: post._id
                  }
              })
          }
          else{
              res.status(500).json({ message: "Error Adding Post" });
          }
        })
      })})
      


   
router.put("/:id",
    
    (req, res, next) => {
        
        

        const post = new Post({
            _id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            upvote: req.body.upvote,
            downvote : req.body.downvote,
            
        });
        console.log(Post)
        Post.updateOne(
            { _id: req.params.id, author: req.body.author, author: req.body.author,
              upvote: req.body.upvote,
              downvote : req.body.downvote},
            post
          ).then(result => {
            if(result){
                res.status(200).json({ message: "Update successful!" });
            }
            
            else {
                res.status(500).json({ message: "Error Upating Post" });
            }
        });
    }
);




router.get("", (req, res, next) => {
    Post.find().then(documents => {
        if(documents){
            res.status(200).json({
                message: "Posts fetched successfully!",
                posts: documents
            });
        }
        else{
            res.status(404).json({ message: "Post not found!" });
        }
       
    });
});
router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    });
  });
  
  router.delete("/:id",  (req, res, next) => {
    Post.deleteOne({ _id: req.params.id}).then(
      result => {
        console.log(result)
        if (result.n > 0) {
          res.status(200).json({ message: "Deletion successful!" });
        } else {
            return res.status(401).json({ message: "Not authorized!!" });
        }
      }
    );
  });


  




module.exports = router