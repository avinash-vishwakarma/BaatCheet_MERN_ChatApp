import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { getAuthState } from "../../context/authcontext";
import useFetch from "../../hooks/useFetch";
import ChatDetailsBox from "../ui/ChatDetailsBox";
import Model from "../ui/Model";
import UserProfilePic from "../ui/UserProfilePic";
import classes from "./chatBox.module.css";
import getReciverInfo from "../../util/getReciversInfo";
import { useRef } from "react";
import io from "socket.io-client";

let socket, selectedChatCompare;

const SelectedChat = () => {
  const { selectedChat, userInfo } = getAuthState();
  const [showChatDetails, setShowChatDetails] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [AllMessages, setAllMessages] = useState([]);
  const sendMessageRequest = useFetch();
  const getAllMessagesRequest = useFetch();
  const endOfMessageRef = useRef();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    console.log("socket io useEffect ran");
    socket = io();
    socket.emit("setup", userInfo);
    socket.on("connected", () => {
      setSocketConnected(true);
    });
    socket.on("typing", () => {
      setIsTyping(true);
    });

    socket.on("stop typing", () => {
      setIsTyping(false);
    });
  }, []);

  const reciverInfo = !selectedChat.isGroupChat
    ? getReciverInfo(userInfo, selectedChat.users)
    : null;

  const showChatDetailsHandler = () => {
    setShowChatDetails(true);
  };

  const UserTypingHandler = (e) => {
    setMessageInput(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDifference = timeNow - lastTypingTime;
      if (timeDifference >= timerLength && isTyping) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const sendChatSubmitHandler = (e) => {
    e.preventDefault();
    setMessageInput("");
    socket.emit("stop typing", selectedChat._id);
    sendMessageRequest.request("http://localhost:5000/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: selectedChat._id,
        content: messageInput,
      }),
    });
  };

  useEffect(() => {
    if (sendMessageRequest.data) {
      setAllMessages((oldMessaegs) => [
        ...oldMessaegs,
        sendMessageRequest.data.message,
      ]);

      sendMessageRequest.data;

      socket.emit("sendMessage", sendMessageRequest.data.message);
    }
  }, [sendMessageRequest.data]);

  useEffect(() => {
    if (selectedChat._id) {
      getAllMessagesRequest.request(
        `http://localhost:5000/api/message/${selectedChat._id}`
      );

      selectedChatCompare = selectedChat;
    }
  }, [selectedChat]);

  useEffect(() => {
    if (getAllMessagesRequest.data) {
      console.log("setting all message to response message");
      setAllMessages(getAllMessagesRequest.data.messages);
      socket.emit("joinChat", selectedChat._id);
    }
  }, [getAllMessagesRequest.data]);

  useEffect(() => {
    endOfMessageRef.current?.scrollIntoView();
  }, [AllMessages]);

  useEffect(() => {
    socket.on("message recived", (newMessageRecived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecived.chat._id
      ) {
        // give notification
      } else {
        setAllMessages((old) => [...old, newMessageRecived]);
      }
    });
  }, []);

  return (
    <div className={classes.chatBox}>
      <div className={classes.reciverDetails} onClick={showChatDetailsHandler}>
        <UserProfilePic />
        <div className={classes.reciverData}>
          <h4>
            {selectedChat.isGroupChat
              ? selectedChat.chatName
              : reciverInfo.name}
          </h4>
          {reciverInfo && <p>{reciverInfo.number}</p>}
        </div>
      </div>
      {/* chat details model */}
      {showChatDetails && (
        <Model
          onClose={() => {
            setShowChatDetails(false);
          }}
        >
          <ChatDetailsBox />
        </Model>
      )}
      <div className={classes.messageBox}>
        <div className={classes.messagesContainer}>
          {AllMessages.map((message) => {
            return (
              <div
                className={`${classes.singleMessage} ${
                  message.sender._id === userInfo._id && classes.rightMessage
                }`}
                key={message._id}
              >
                {message.content}
              </div>
            );
          })}
          {isTyping && <div> typing... </div>}
          <div ref={endOfMessageRef} />
        </div>
      </div>
      <form className={classes.sendChatInput} onSubmit={sendChatSubmitHandler}>
        <input type="text" onChange={UserTypingHandler} value={messageInput} />
        <button>
          <Icon icon="material-symbols:send-rounded" />
        </button>
      </form>
    </div>
  );
};

export default SelectedChat;
