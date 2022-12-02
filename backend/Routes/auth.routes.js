const express = require("express");
const app = express.Router();
const {
  loginUserController,
  registerUserController,
} = require("../Controllers/Auth.controller");

app.route("/").post(loginUserController);
app.route("/register").post(registerUserController);

module.exports = app;
