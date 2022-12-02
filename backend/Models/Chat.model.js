const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    chatName: {
      type: String,
      trim: true,
      require: true,
    },
    isGroupChat: {
      type: Boolean,
      require: true,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
