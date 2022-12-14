const ConversationsModel = require("../models/conversationsModel");
const PostsModel = require("../models/postsModel");

const getAllConversations = async function (req, res, next) {
  try {
    const conversations = await ConversationsModel.findAllConversations(
      req.query
    );
    const pageProperties = { title: "Conversations", conversations };
    res.status(200).render("index", pageProperties);
  } catch (err) {
    next(err);
  }
};

const createNewConversation = async (req, res, next) => {
  try {
    await ConversationsModel.addConversation(req.body);
    res.status(200).redirect("/");
  } catch (err) {
    next(err);
  }
};

const getAuthorConversations = async function (req, res, next) {
  try {
    const { author } = req.params;
    const conversations = await ConversationsModel.findConversationsByAuthor(
      author,
      req.query
    );
    const pageProperties = {
      title: `Conversations by ${author}`,
      author,
      conversations,
    };
    res.status(200).render("author", pageProperties);
  } catch (err) {
    next(err);
  }
};

const getSingleConversation = async function (req, res, next) {
  const { id } = req.params;
  try {
    const post = await ConversationsModel.findConversation(id);
    const pageProperties = {
      post,
    };
    res.status(200).render("edit", pageProperties);
  } catch (err) {
    next(err);
  }
};

const getConversationPage = async function (req, res, next) {
  const { id } = req.params;
  try {
    const conversation = await ConversationsModel.findConversation(id);
    const posts = await PostsModel.findAllPosts(req.query, id);
    const pageProperties = {
      title: `${conversation[0].subject}`,
      conversation,
      posts,
    };
    res.status(200).render("conversation", pageProperties);
  } catch (err) {
    next(err);
  }
};

const deleteConversation = async function (req, res, next) {
  try {
    await PostsModel.deleteConversationPosts(req.params.id);
    await ConversationsModel.deleteConversation(req.params.id);
    res.status(200).redirect("/");
  } catch (err) {
    next(err);
  }
};

const editConversation = async function (req, res, next) {
  try {
    await ConversationsModel.updateConversation(req.params.id, req.body);
    res.status(200).redirect(`/conversation/${req.params.id}`);
  } catch {
    next(err);
  }
};

const upvoteConversation = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ConversationsModel.upvoteConversation(id);
    res.status(200).redirect(req.get("Referrer") + `#${id}`);
  } catch (err) {
    next(err);
  }
};

const downvoteConversation = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ConversationsModel.downvoteConversation(id);
    res.status(200).redirect(req.get("Referrer") + `#${id}`);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllConversations,
  createNewConversation,
  getAuthorConversations,
  getSingleConversation,
  getConversationPage,
  deleteConversation,
  editConversation,
  upvoteConversation,
  downvoteConversation,
};
