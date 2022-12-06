const knex = require("knex");
const config = require("../knexfile");

const db = knex(config.development);

// get all posts
const findAllPosts = async (query) => {
  if (Object.keys(query).length === 2) {
    return await db("posts").orderBy(query.value, query.sort);
  }
  return await db("posts").orderBy("created_at", "desc");
};

const findPostsByAuthor = async (author, query) => {
  if (Object.keys(query).length === 2) {
    console.log("in query");
    return await db("posts")
      .where("author", author)
      .orderBy(query.value, query.sort);
  }
  console.log("outside query");
  return await db("posts")
    .where("author", author)
    .orderBy("created_at", "desc");
};

// add a post
const addPost = async (post) => {
  if (post.author === "") {
    delete post.author;
  }
  const [id] = await db("posts").insert(post);
};

// get single post
const findPost = async (id) => {
  return await db("posts").where("blog_id", id);
};

// delete a post
const deletePost = async (id) => {
  await db("posts").where("blog_id", id).delete();
};

// update a post
const updatePost = async (id, body) => {
  await db("posts")
    .where("blog_id", id)
    .update({ ...body, updated_at: new Date().toISOString() });
};

const upvotePost = async (id, body) => {
  await db("posts").where("blog_id", id).increment("votes", 1);
};

const downvotePost = async (id, body) => {
  await db("posts").where("blog_id", id).decrement("votes", 1);
};

module.exports = {
  addPost,
  findAllPosts,
  findPost,
  deletePost,
  updatePost,
  upvotePost,
  downvotePost,
  findPostsByAuthor,
};
