var express = require("express");
var router = express.Router();
const Posts = require("../models/postsModel");

// GET home page
router.get("/", async function (req, res, next) {
  try {
    const posts = await Posts.findAllPosts(req.query);
    const pageProperties = { title: "Posts", posts };
    res.status(200).render("index", pageProperties);
  } catch (err) {
    next(err);
  }
});

// POST home page
router.post("/", async (req, res, next) => {
  try {
    await Posts.addPost(req.body);
    res.status(200).redirect("/");
  } catch (err) {
    next(err);
  }
});

// GET user page
router.get("/author/:author", async function (req, res, next) {
  try {
    const { author } = req.params;
    const posts = await Posts.findPostsByAuthor(author, req.query);
    const pageProperties = {
      title: `Posts by ${author}`,
      author,
      posts,
    };
    res.status(200).render("author", pageProperties);
  } catch (err) {
    next(err);
  }
});

// GET individual post
router.get("/author/:author/post/:id", async function (req, res, next) {
  try {
    const post = await Posts.findPost(req.params.id);
    const pageProperties = { title: "Edit Post", post };
    res.status(200).render("edit", pageProperties);
  } catch (err) {
    next(err);
  }
});

// DELETE post
router.post("/author/:author/post/:id/delete", async function (req, res, next) {
  try {
    await Posts.deletePost(req.params.id);
    res.status(200).redirect("/");
  } catch (err) {
    next(err);
  }
});

// UPDATE post
router.post("/author/:author/post/:id/edit", async function (req, res, next) {
  try {
    await Posts.updatePost(req.params.id, req.body);
    res.status(200).redirect("/");
  } catch {
    next(err);
  }
});

// UPVOTE post
router.post("/author/:author/post/:id/upvote", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Posts.upvotePost(id);
    res.status(200).redirect(req.get("Referrer") + `#${id}`);
  } catch (err) {
    next(err);
  }
});

// DOWNVOTE post
router.post("/author/:author/post/:id/downvote", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Posts.downvotePost(id);
    res.status(200).redirect(req.get("Referrer") + `#${id}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
