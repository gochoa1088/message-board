var express = require("express");
var router = express.Router();
const Posts = require("../models/postsModel");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const posts = await Posts.findAllPosts(req.query);
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

/* GET user page. */
router.get("/:author", async function (req, res, next) {
  try {
    const posts = await Posts.findPostsByAuthor(req.params.author, req.query);
    if(posts.length === 0) throw new Error(`Sorry, there are no posts by ${req.params.author}!`);
    const pageProperties = {
      title: `Posts by ${req.params.author}`,
      author: req.params.author,
      posts,
    };
    res.status(200).render("author", pageProperties);
  } catch (error) {
    const pageProperties = { 
      message: "Somthing went wrong!",
      error
    }
    res.status(500).render("error", pageProperties);
  }
});

// GET individual post
router.get("/:author/:id", async function (req, res, next) {
  try {
    const post = await Posts.findPost(req.params.id);
    if(post.length === 0) throw new Error(`Could not find post with ID: ${req.params.id}.`);
    const pageProperties = { title: "Edit Post", post };
    res.status(200).render("edit", pageProperties);
  } catch (error) {
    const pageProperties = {error}
    res.status(500).render("error", pageProperties);
  }
});

// Delete post
router.post("/:author/:id/delete", async function (req, res, next) {
  try {
    await Posts.deletePost(req.params.id);
    res.status(200).redirect("/");
  } catch (err) {
    res.status(500).json({ message: "Unable to delete post." });
  }
});

//Edit post
router.post("/:author/:id/edit", async function (req, res, next) {
  try {
    await Posts.updatePost(req.params.id, req.body);
    res.status(200).redirect("/");
  } catch {
    res.status(500).json({ message: "Unable to update post." });
  }
});

// upvote post
router.post("/:author/:id/upvote", async (req, res, next) => {
  try {
    await Posts.upvotePost(req.params.id);
    res.status(200).redirect(req.get("Referrer") + `#${req.params.id}`);
  } catch (err) {
    res.status(500).json({ message: "Unable to upvote post." });
  }
});

// downvote post
router.post("/:author/:id/downvote", async (req, res, next) => {
  try {
    await Posts.downvotePost(req.params.id);
    res.status(200).redirect(req.get("Referrer") + `#${req.params.id}`);
  } catch (err) {
    res.status(500).json({ message: "Unable to downvote post." });
  }
});

module.exports = router;
