const PostsModel = require("../models/postsModel");

const getAllPosts = async function (req, res, next) {
  try {
    const posts = await PostsModel.findAllPosts(req.query);
    const pageProperties = { title: "Posts", posts };
    res.status(200).render("index", pageProperties);
  } catch (err) {
    next(err);
  }
};

const createNewPost = async (req, res, next) => {
  try {
    await PostsModel.addPost(req.body);
    res.status(200).redirect("/");
  } catch (err) {
    next(err);
  }
};

const getAuthorPosts = async function (req, res, next) {
  try {
    const { author } = req.params;
    const posts = await PostsModel.findPostsByAuthor(author, req.query);
    const pageProperties = {
      title: `Posts by ${author}`,
      author,
      posts,
    };
    res.status(200).render("author", pageProperties);
  } catch (err) {
    next(err);
  }
};

const getSinglePost = async function (req, res, next) {
  try {
    const post = await PostsModel.findPost(req.params.id);
    const pageProperties = { title: "Edit Post", post };
    res.status(200).render("edit", pageProperties);
  } catch (err) {
    next(err);
  }
};

const deletePost = async function (req, res, next) {
  try {
    await PostsModel.deletePost(req.params.id);
    res.status(200).redirect("/");
  } catch (err) {
    next(err);
  }
};

const editPost = async function (req, res, next) {
  try {
    await PostsModel.updatePost(req.params.id, req.body);
    res.status(200).redirect("/");
  } catch {
    next(err);
  }
};

const upvotePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    await PostsModel.upvotePost(id);
    res.status(200).redirect(req.get("Referrer") + `#${id}`);
  } catch (err) {
    next(err);
  }
};

const downvotePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    await PostsModel.downvotePost(id);
    res.status(200).redirect(req.get("Referrer") + `#${id}`);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllPosts,
  createNewPost,
  getAuthorPosts,
  getSinglePost,
  deletePost,
  editPost,
  upvotePost,
  downvotePost,
};
