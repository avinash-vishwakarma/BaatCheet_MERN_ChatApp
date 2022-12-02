const Chat = require("../Models/Chat.model");
const Message = require("../Models/Message.model");
const User = require("../Models/User.model");

exports.sendMessageController = async (req, res, next) => {
  const { content, chat_Id } = req.body;

  let createdMessage = await Message.create({
    sender: req.user._id,
    content,
    chat: chat_Id,
  });

  createdMessage = await createdMessage.populate("sender", "name pic");
  createdMessage = await createdMessage.populate("chat");
  createdMessage = await User.populate(createdMessage, {
    path: "chat.users",
    select: "name pic number",
  });

  await Chat.findByIdAndUpdate(chat_Id, {
    latestMessage: createdMessage,
  });

  res.json({
    status: "ok",
    message: createdMessage,
  });
};
exports.getAllMessagesController = async (req, res, next) => {
  const { chat_Id } = req.params;

  const messages = await Message.find({ chat: chat_Id })
    .populate("sender", "name pic number")
    .populate("chat");

  res.json({
    status: "ok",
    messages,
  });
};
