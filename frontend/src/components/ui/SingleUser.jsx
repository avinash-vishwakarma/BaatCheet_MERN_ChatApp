import React from "react";
import classes from "./singleUser.module.css";
import UserProfilePic from "./UserProfilePic";

const SingleUser = ({ active, name, pic, lastMessage, onClick }) => {
  return (
    <li
      className={`${classes.singleChatLi} ${active && classes.activeChat}`}
      onClick={onClick}
    >
      <UserProfilePic src={pic} />
      <div className={classes.singleUserHiglight}>
        <h4>{name}</h4>
        {lastMessage && <p>{lastMessage}</p>}
      </div>
    </li>
  );
};

export default SingleUser;
