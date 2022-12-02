const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    content: {
      type: String,
      require: true,
      trim: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Chat",
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
