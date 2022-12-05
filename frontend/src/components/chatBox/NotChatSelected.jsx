import React from "react";
import classes from "./chatBox.module.css";

const NotChatSelected = () => {
  return (
    <div className={`${classes.chatBox} ${classes.noChatBox} `}>
      <img src="./selectUser.svg" alt="" />
      select a user to start chating
    </div>
  );
};

export default NotChatSelected;
