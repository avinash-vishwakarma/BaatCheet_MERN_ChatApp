import React from "react";
import { getAuthState } from "../../context/authcontext";
import NotChatSelected from "./NotChatSelected";
import SelectedChat from "./SelectedChat";

const ChatBox = () => {
  const { selectedChat } = getAuthState();

  if (selectedChat._id) {
    return <SelectedChat />;
  } else {
    return <NotChatSelected />;
  }
};

export default ChatBox;
