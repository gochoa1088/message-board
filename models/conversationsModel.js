const db = require("../dbConfig");

const findAllConversations = async (query) => {
  console.log(query);
  try {
    if (Object.keys(query).length === 2) {
      return await db("conversations").orderBy(query.value, query.sort);
    }
    return await db("conversations").orderBy("created_at", "desc");
  } catch (error) {
    if (error.code === "SQLITE_ERROR") {
      throw new Error("Invalid query.");
    }
  }
};

const addConversation = async (conversation) => {
  if (conversation.author === "") {
    delete conversation.author;
  }
  if (conversation.content === "") {
    throw new Error("Cannot submit empty post!");
  }
  try {
    await db("conversations").insert(conversation);
  } catch (err) {
    throw new Error("Unable to add post!");
  }
};

const findConversationsByAuthor = async (author, query) => {
  try {
    let conversations;
    if (Object.keys(query).length === 2) {
      conversations = await db("conversations")
        .where("author", author)
        .orderBy(query.value, query.sort);
    } else {
      conversations = await db("conversations")
        .where("author", author)
        .orderBy("created_at", "desc");
    }
    if (!conversations.length) {
      throw new Error(`Sorry, there are no conversations by ${author}!`);
    }
    return conversations;
  } catch (error) {
    if (error.code === "SQLITE_ERROR") {
      throw new Error("Invalid query.");
    }
    throw error;
  }
};

// get single conversation
const findConversation = async (id) => {
  const conversation = await db("conversations").where("id", id);
  if (!conversation.length) {
    throw new Error(`Sorry, could not find conversation with ID: ${id}.`);
  }
  return conversation;
};

// delete a conversation
const deleteConversation = async (id) => {
  await db("conversation").where("id", id).delete();
  await db("posts").where("conversation_id", id).delete();
};

const updateConversation = async (id, body) => {
  await db("conversations")
    .where("id", id)
    .update({ ...body, updated_at: new Date().toISOString() });
};

const upvoteConversation = async (id) => {
  await db("conversations").where("id", id).increment("votes", 1);
};

const downvoteConversation = async (id) => {
  await db("conversations").where("id", id).decrement("votes", 1);
};

module.exports = {
  addConversation,
  findAllConversations,
  findConversationsByAuthor,
  findConversation,
  deleteConversation,
  updateConversation,
  upvoteConversation,
  downvoteConversation,
};
