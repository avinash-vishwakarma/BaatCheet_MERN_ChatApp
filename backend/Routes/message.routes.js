const express = require("express");
const {
  sendMessageController,
  getAllMessagesController,
} = require("../Controllers/messaage.controller");
const { isAuth } = require("../middleware/auth.middleware");
const app = express.Router();

app.post("/", isAuth, sendMessageController);
app.get("/:chat_Id", isAuth, getAllMessagesController);

module.exports = app;
