const Chat = require("../Models/Chat.model");
const Message = require("../Models/Message.model");
const User = require("../Models/User.model");

exports.sendMessageController = async (req, res, next) => {
  let createdMessage = await Message.create({
    sender: req.user._id,
    content: req.body.content,
    chat: req.body.chat_id,
  });

  createdMessage = await createdMessage.populate("sender", "name pic");
  createdMessage = await createdMessage.populate("chat");
  createdMessage = await User.populate(createdMessage, {
    path: "chat.users",
    select: "name pic number",
  });

  await Chat.findByIdAndUpdate(req.body.chat_id, {
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
