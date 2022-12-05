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
  const server = app.listen(PORT, () => {
    console.log(`server started at port http://localhost:${PORT}`);
  });

  const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://127.0.0.1:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      console.log(userData._id);
      socket.emit("connected");
    });

    socket.on("joinChat", (room) => {
      socket.join(room);
      console.log("User Join Room " + room);
    });

    socket.on("typing", (room) => {
      socket.in(room).emit("typing");
    });

    socket.on("stop typing", (room) => {
      socket.in(room).emit("stop typing");
    });

    socket.on("sendMessage", (newMessageRecive) => {
      let chat = newMessageRecive.chat;
      if (!chat.users) return console.log("chat user not defined");

      chat.users.forEach((user) => {
        if (user._id == newMessageRecive.sender._id) return;
        socket.in(user._id).emit("message recived", newMessageRecive);
      });
    });
  });
});
