var express = require("express");
var router = express.Router();
const PostsController = require("../controllers/postsController");
const ConversationsController = require("../controllers/conversationsController");

// GET home page
router.get("/", ConversationsController.getAllConversations);

// POST home page
router.post("/", ConversationsController.createNewConversation);

//

// GET conversation page
router.get("/conversation/:id", PostsController.getAllPosts);

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
