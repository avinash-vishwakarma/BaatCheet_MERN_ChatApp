import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAuthState } from "../../context/authcontext";
import useFetch from "../../hooks/useFetch";
import getReciverName from "../../util/gerReciverName";
import SingleUser from "../ui/SingleUser";
import classes from "./mychats.module.css";

const MyChats = () => {
  const getMychatsRequest = useFetch();
  const { setChats, chats, selectedChat, setSelectedChat, fetchChats } =
    getAuthState();
  const [loggedUser, setLoggedUser] = useState();

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("user_info")));
    getMychatsRequest.request("http://localhost:5000/api/chat");
  }, [fetchChats]);

  useEffect(() => {
    if (getMychatsRequest.data) {
      setChats(getMychatsRequest.data.chats);
    }
  }, [getMychatsRequest.data]);

  const openChatHandler = (chat) => {
    if (selectedChat._id === chat._id) {
      return;
    }
    // change the selectd chat to the new chat
    setSelectedChat(chat);
  };

  return (
    <ul className={classes.mychatList}>
      {/* single user box */}

      {chats.map((chat) => {
        return (
          <SingleUser
            onClick={openChatHandler.bind(null, chat)}
            key={chat._id}
            active={selectedChat._id === chat._id}
            name={
              chat.isGroupChat
                ? chat.chatName
                : getReciverName(loggedUser, chat.users)
            }
            lastMessage={chat.latestMessage?.content}
          />
        );
      })}
    </ul>
  );
};

export default MyChats;
