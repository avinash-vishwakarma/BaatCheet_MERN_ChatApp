import React from "react";
import classes from "./chatBox.module.css";
import { Icon } from "@iconify/react";
import UserProfilePic from "../ui/UserProfilePic";
import { getAuthState } from "../../context/authcontext";
import getReciverInfo from "../../util/getReciversInfo";
import { useState } from "react";
import Model from "../ui/Model";
import ChatDetailsBox from "../ui/ChatDetailsBox";

const ChatBox = () => {
  const { selectedChat, userInfo } = getAuthState();
  const [showChatDetails, setShowChatDetails] = useState(false);

  if (!selectedChat._id) {
    return (
      <div className={`${classes.chatBox} ${classes.noChatBox} `}>
        <img src="./selectUser.svg" alt="" />
        select a user to start chating
      </div>
    );
  }

  const reciverInfo = !selectedChat.isGroupChat
    ? getReciverInfo(userInfo, selectedChat.users)
    : null;

  const showChatDetailsHandler = () => {
    setShowChatDetails(true);
  };

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

      <div className={classes.messageBox}></div>
      <form className={classes.sendChatInput}>
        <input type="text" />
        <button>
          <Icon icon="material-symbols:send-rounded" />
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
