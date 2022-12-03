const knex = require("knex");
const config = require("../knexfile");

const db = knex(config.development);

// get all posts
const findAllPosts = async () => {
  return await db("posts");
};

// add a post
const addPost = async (post) => {
  const [id] = await db("posts").insert(post);
};

// delete a post

module.exports = {
  addPost,
  findAllPosts,
};
