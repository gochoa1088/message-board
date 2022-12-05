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

// get single post
const findPost = async (id) => {
  return await db('posts')
    .where("blog_id", id);
}


// delete a post
const deletePost = async (id) => {
  await await db('posts')
    .where("blog_id", id)
    .delete()
};

// update a post
const updatePost = async (id, postEdit) => {
  await db('posts')
    .where("blog_id", id)
    .update({ content: postEdit })
};

module.exports = {
  addPost,
  findAllPosts,
  findPost,
  deletePost,
  updatePost,
};
