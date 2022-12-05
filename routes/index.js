var express = require("express");
var router = express.Router();
const Posts = require("../models/postsModel");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const posts = await Posts.findAllPosts();
    res.status(200).render("index", posts);
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
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Unable to find post." })
  }
})

// Delete post
router.delete("/:id", async function (req, res, next) {
  try {
    await Posts.deletePost(req.params.id)
    res.status(200).redirect("/");
  } catch (err) {
    res.status(500).json({ message: "Unable to delete post." })
  }
})

// Update Post
router.put("/:id", async function (req, res, next) {
  try {
    await Posts.updatePost(req.params.id, req.body.content)
    res.status(200).redirect("/")
  } catch {
    res.status(500).json({ message: "Unable to update post." })
  }
})

module.exports = router;
