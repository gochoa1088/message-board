var express = require("express");
var router = express.Router();
const PostsController = require("../controllers/postsController");

// GET home page
router.get("/", PostsController.getAllConversations);

// POST home page
router.post("/", PostsController.createNewConversation);

// GET conversation page
router.get("/", PostsController.getAllPosts);

// POST conversation page
router.post("/conversation/:id", PostsController.createNewPost);

// GET user page
router.get("/author/:author", PostsController.getAuthorPosts);

// GET individual post
router.get("/author/:author/post/:id", PostsController.getSinglePost);

// DELETE post
router.post("/author/:author/post/:id/delete", PostsController.deletePost);

// UPDATE post
router.post("/author/:author/post/:id/edit", PostsController.editPost);

// UPVOTE post
router.post("/author/:author/post/:id/upvote", PostsController.upvotePost);

// DOWNVOTE post
router.post("/author/:author/post/:id/downvote", PostsController.downvotePost);

module.exports = router;
