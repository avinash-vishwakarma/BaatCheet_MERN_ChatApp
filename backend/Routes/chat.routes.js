const express = require("express");
const app = express.Router();
const {
  accessChatController,
  getAllChatController,
  createNewGroupConroller,
  addUserToGroupController,
  renameGroupController,
  removeFromGroupController,
} = require("../Controllers/chat.controller");
const { isAuth } = require("../middleware/auth.middleware");

app.post("/", isAuth, accessChatController);
app.get("/", isAuth, getAllChatController);
app.post("/group", isAuth, createNewGroupConroller);
app.post("/groupadd", isAuth, addUserToGroupController);
app.post("/rename", isAuth, renameGroupController);
app.post("/remove", isAuth, removeFromGroupController);

module.exports = app;
