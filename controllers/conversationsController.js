const ConversationsModel = require("../models/conversationsModel");

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
  try {
    const conversation = await ConversationsModel.findConversation(
      req.params.id
    );
    const pageProperties = { title: "Edit Conversation", conversation };
    res.status(200).render("edit", pageProperties);
  } catch (err) {
    next(err);
  }
};

const deleteConversation = async function (req, res, next) {
  try {
    await ConversationsModel.deleteConversation(req.params.id);
    res.status(200).redirect("/");
  } catch (err) {
    next(err);
  }
};

const editConversation = async function (req, res, next) {
  try {
    await ConversationsModel.updateConversation(req.params.id, req.body);
    res.status(200).redirect("/");
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
  deleteConversation,
  editConversation,
  upvoteConversation,
  downvoteConversation,
};
