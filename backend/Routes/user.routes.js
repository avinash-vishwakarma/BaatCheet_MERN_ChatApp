const express = require("express");
const { getAllUserController } = require("../Controllers/User.controller");
const { isAuth } = require("../middleware/auth.middleware");
const app = express();

app.get("/", isAuth, getAllUserController);

module.exports = app;
