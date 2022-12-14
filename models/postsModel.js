const db = require("../dbConfig");

// get all posts
const findAllPosts = async (query, id) => {
  try {
    if (Object.keys(query).length === 2) {
      return await db("posts")
        .where("conversation_id", id)
        .orderBy(query.value, query.sort);
    }
    return await db("posts")
      .where("conversation_id", id)
      .orderBy("created_at", "desc");
  } catch (error) {
    if (error.code === "SQLITE_ERROR") {
      throw new Error("Invalid query.");
    }
  }
};

const findPostsByAuthor = async (author, query) => {
  try {
    let posts;
    if (Object.keys(query).length === 2) {
      posts = await db("posts")
        .where("author", author)
        .orderBy(query.value, query.sort);
    } else {
      posts = await db("posts")
        .where("author", author)
        .orderBy("created_at", "desc");
    }
    return posts;
  } catch (error) {
    if (error.code === "SQLITE_ERROR") {
      throw new Error("Invalid query.");
    }
    throw error;
  }
};

// add a post
const addPost = async (post, id) => {
  post.conversation_id = id;
  if (post.author === "") {
    delete post.author;
  }
  if (post.content === "") {
    throw new Error("Cannot submit empty post!");
  }
  try {
    await db("posts").insert(post);
  } catch (err) {
    throw new Error("Unable to add post!");
  }
};

// get single post
const findPost = async (id) => {
  const post = await db("posts").where("id", id);
  if (!post.length) {
    throw new Error(`Sorry, could not find post with ID: ${id}.`);
  }
  return post;
};

// delete a post
const deletePost = async (id) => {
  await db("posts").where("id", id).delete();
};

const deleteConversationPosts = async (id) => {
  await db("posts").where("conversation_id", id).delete();
};

// update a post
const updatePost = async (id, body) => {
  await db("posts")
    .where("id", id)
    .update({ ...body, updated_at: new Date().toISOString() });
};

const upvotePost = async (id, body) => {
  await db("posts").where("id", id).increment("votes", 1);
};

const downvotePost = async (id, body) => {
  await db("posts").where("id", id).decrement("votes", 1);
};

module.exports = {
  addPost,
  findAllPosts,
  findPost,
  deletePost,
  deleteConversationPosts,
  updatePost,
  upvotePost,
  downvotePost,
  findPostsByAuthor,
};
