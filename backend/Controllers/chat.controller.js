const Chat = require("../Models/Chat.model");
const asyncHandler = require("express-async-handler");
const User = require("../Models/User.model");

exports.accessChatController = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    next({
      status: 400,
      message: "select a user for starting the chat",
    });
  }

  const isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  if (isChat.length > 0) {
    res.json({
      status: "ok",
      data: isChat[0],
    });
  } else {
    const createdChat = await Chat.create({
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    });

    const FullChat = await Chat.findById(createdChat._id).populate(
      "users",
      "-password"
    );

    res.json({
      status: "ok",
      data: FullChat,
    });
  }
});

exports.getAllChatController = (req, res, next) => {
  try {
    const chats = Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });

        res.json({
          status: "ok",
          chats: results,
        });
      });
  } catch (err) {
    next({
      message: err.message,
    });
  }
};

exports.createNewGroupConroller = async (req, res, next) => {
  if (!req.body.users || !req.body.chatName) {
    return next({
      status: 400,
      message: "kindly fill all the fields",
    });
  }

  if (req.body.users.length < 2) {
    return next({
      status: "400",
      message: "more then 2 users are required to form a group chat",
    });
  }

  req.body.users.push(req.user);

  const createdChat = await Chat.create({
    isGroupChat: true,
    chatName: req.body.chatName,
    users: req.body.users,
    groupAdmin: req.user,
  });

  const fullGroupChat = await Chat.findById(createdChat._id)
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  res.json({
    status: "ok",
    chat: fullGroupChat,
  });
};

exports.addUserToGroupController = async (req, res, next) => {
  const { chat_id, user_id } = req.body;

  if (!chat_id || !user_id) {
    return next({
      message: "kindly provide proper deatils",
    });
  }

  const added = await Chat.findByIdAndUpdate(
    chat_id,
    {
      $push: { users: user_id },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    next({
      status: 404,
      message: "Chat Not Found",
    });
  } else {
    res.json({
      status: "ok",
      chat: added,
    });
  }
};

exports.renameGroupController = async (req, res, next) => {
  const { chat_id, chatName } = req.body;

  if (!chat_id || !chatName) {
    return next({
      message: "kindly provide proper deatils",
    });
  }

  const updated = await Chat.findByIdAndUpdate(
    chat_id,
    {
      chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updated) {
    return next({
      status: 404,
      message: "Chat Not Found",
    });
  } else {
    res.json({
      status: "ok",
      chat: updated,
    });
  }
};

exports.removeFromGroupController = async (req, res, next) => {
  const { chat_id, user_id } = req.body;

  if (!chat_id && !user_id) {
    return next({
      message: "kindly provid valid deatils",
    });
  }

  const updated = await Chat.findByIdAndUpdate(
    chat_id,
    {
      $pull: { users: user_id },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updated) {
    return next({
      status: 404,
      message: "Chat Not found",
    });
  }

  res.json({
    status: "ok",
    chat: updated,
  });
};
