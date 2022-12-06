var express = require("express");
var router = express.Router();
const Posts = require("../models/postsModel");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const posts = await Posts.findAllPosts();
    const pageProperties = { title: "Posts", posts };
    res.status(200).render("index", pageProperties);
  } catch (err) {
    res.status(500).json({ message: "Unable to find posts" });
  }
});

/* POST home page. */
router.post("/", async (req, res, next) => {
  try {
    await Posts.addPost(req.body);
    res.status(200).redirect("/");
  } catch (err) {
    res.status(500).json({ message: "Unable to add post" });
  }
});

// GET individual post
router.get("/:id", async function (req, res, next) {
  try {
    const post = await Posts.findPost(req.params.id);
    const pageProperties = { title: "Edit Post", post };
    res.status(200).render("edit", pageProperties);
  } catch (err) {
    res.status(500).json({ message: "Unable to find post." });
  }
});

// Delete post
router.post("/:id/delete", async function (req, res, next) {
  try {
    await Posts.deletePost(req.params.id);
    res.status(200).redirect("/");
  } catch (err) {
    res.status(500).json({ message: "Unable to delete post." });
  }
});

//Edit post
router.post("/:id/edit", async function (req, res, next) {
  try {
    await Posts.updatePost(req.params.id, req.body);
    res.status(200).redirect("/");
  } catch {
    res.status(500).json({ message: "Unable to update post." });
  }
});

// upvote post
router.post("/:id/upvote", async (req, res, next) => {
  try {
    await Posts.upvotePost(req.params.id);
    res.status(200).redirect("/");
  } catch (err) {
    res.status(500).json({ message: "Unable to upvote post." });
  }
});

// downvote post
router.post("/:id/downvote", async (req, res, next) => {
  try {
    await Posts.downvotePost(req.params.id);
    res.status(200).redirect("/");
  } catch (err) {
    res.status(500).json({ message: "Unable to downvote post." });
  }
});

module.exports = router;
