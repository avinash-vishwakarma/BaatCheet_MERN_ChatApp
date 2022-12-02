// importing pakages
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./config/db.config");
const authRoutes = require("./Routes/auth.routes");
const userRoutes = require("./Routes/user.routes");
const chatRoutes = require("./Routes/chat.routes");
const messageRoutes = require("./Routes/message.routes");
const {
  notFoundError,
  globalErroHandler,
} = require("./Controllers/error.controller");

// config pakages

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config();

app.use("/api/", authRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/chat/", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("*", notFoundError);
app.use(globalErroHandler);

connectDB(() => {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`server started at port http://localhost:${PORT}`);
  });
});
