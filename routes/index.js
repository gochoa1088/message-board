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

router.post("/", async (req, res, next) => {
  await Posts.addPost(req.body)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({ message: "Unable to add post" });
    });
});

module.exports = router;
