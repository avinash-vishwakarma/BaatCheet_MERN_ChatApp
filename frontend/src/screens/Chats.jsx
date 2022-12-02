import React from "react";
import classes from "./chats.module.css";
import UserBox from "../components/userBox/UserBox";
import ChatBox from "../components/chatBox/chatBox";
import { useState } from "react";
const Chats = () => {
  return (
    <section className={classes.chatSection}>
      <UserBox />
      <ChatBox />
    </section>
  );
};

export default Chats;
