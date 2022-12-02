import { Icon } from "@iconify/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getAuthState } from "../../context/authcontext";
import useFetch from "../../hooks/useFetch";
import getFirstName from "../../util/getFirstName";
import getReciverInfo from "../../util/getReciversInfo";
import classes from "./chatDetailsBox.module.css";
import SingelUser from "./SingelUser/SingelUser";
import UserBadge from "./userBadge/userBadge";

const Group = () => {
  const { selectedChat, userInfo, setSelectedChat, setFetchChats } =
    getAuthState();
  const searchUserRequest = useFetch();
  const addUserToGroupRequest = useFetch();
  const updateGroupNameRequest = useFetch();
  const removeUserRequest = useFetch();

  const [updateGroupInput, setUpdateGroupInput] = useState(
    selectedChat.chatName
  );

  const [showUpdate, setShowUpdate] = useState(false);
  const [showSearchUser, setShowSearchUser] = useState(false);

  const searchUserHandler = (e) => {
    if (e.target.value) {
      searchUserRequest.request(
        `http://localhost:5000/api/user?search=${e.target.value}`
      );
    }
  };

  const addUserHandler = (user_id, chat_id) => {
    // check if the user is aleardy in the grup
    if (selectedChat.users.some((e) => e._id === user_id)) {
      return;
    }

    addUserToGroupRequest.request("http://localhost:5000/api/chat/groupadd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id,
        user_id,
      }),
    });
  };

  const updateGroupNameHandler = () => {
    if (!updateGroupInput) {
      return;
    }

    updateGroupNameRequest.request("http://localhost:5000/api/chat/rename", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: selectedChat._id,
        chatName: updateGroupInput,
      }),
    });
  };

  const removeFromGroupHandler = (user_id) => {
    removeUserRequest.request("http://localhost:5000/api/chat/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: selectedChat._id,
        user_id,
      }),
    });
  };

  useEffect(() => {
    if (addUserToGroupRequest.data) {
      setSelectedChat(addUserToGroupRequest.data.chat);
      setFetchChats((old) => !old);
    }
  }, [addUserToGroupRequest.data, updateGroupNameRequest.data]);

  useEffect(() => {
    if (updateGroupNameRequest.data) {
      setSelectedChat(updateGroupNameRequest.data.chat);
      setFetchChats((old) => !old);
    }
  }, [updateGroupNameRequest.data]);

  useEffect(() => {
    if (removeUserRequest.data) {
      setSelectedChat(removeUserRequest.data.chat);
      setFetchChats((old) => !old);
    }
  }, [removeUserRequest.data]);

  return (
    <div className={classes.chatDetailContainer}>
      <div className={classes.profileImageContainer}>
        <img
          src={
            selectedChat.groupPic
              ? selectedChat.groupPic
              : "./profilePicHoldre.jpg"
          }
          alt=""
        />
      </div>
      <div className={classes.chatDataContainer}>
        <strong>name</strong>
        <p>{selectedChat.chatName}</p>
        {selectedChat.groupAdmin._id === userInfo._id && (
          <button
            onClick={setShowUpdate.bind(null, (old) => !old)}
            className={classes.updateNameButton}
          >
            <Icon icon="carbon:pen" />
          </button>
        )}
      </div>

      {showUpdate && (
        <div
          className={`${classes.chatDataContainer} ${classes.updateInputContainer}`}
        >
          <input
            type="text"
            placeholder="update group name"
            onChange={(e) => {
              setUpdateGroupInput(e.target.value);
            }}
            value={updateGroupInput}
          />
          <button onClick={updateGroupNameHandler}>update</button>
        </div>
      )}

      <div className={classes.chatDataContainer}>
        <strong>users</strong>
        {selectedChat.groupAdmin._id === userInfo._id && (
          <button
            className={classes.addUserButton}
            onClick={setShowSearchUser.bind(null, (old) => !old)}
          >
            <Icon icon="material-symbols:add" /> add users
          </button>
        )}

        <div>
          {selectedChat.users.map((user) => (
            <UserBadge
              key={user._id}
              onClick={removeFromGroupHandler.bind(null, user._id)}
              name={getFirstName(user.name)}
            />
          ))}
        </div>
      </div>

      {showSearchUser && (
        <div
          className={`${classes.chatDataContainer} ${classes.updateInputContainer}`}
        >
          <input
            className={classes.fullWidthInput}
            type="text"
            placeholder="Search Users"
            onChange={searchUserHandler}
          />

          <div className={classes.serchResultContainer}>
            {searchUserRequest.data?.users &&
              searchUserRequest.data?.users.map((user) => (
                <SingelUser
                  key={user._id}
                  name={user.name}
                  number={user.number}
                  pic={user.pic}
                  onClick={addUserHandler.bind(
                    null,
                    user._id,
                    selectedChat._id
                  )}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

const User = () => {
  const { selectedChat, userInfo } = getAuthState();

  const selectedUserInfo = getReciverInfo(userInfo, selectedChat.users);

  return (
    <div className={classes.chatDetailContainer}>
      <div className={classes.profileImageContainer}>
        <img
          src={
            selectedUserInfo.pic
              ? selectedUserInfo.pic
              : "./profilePicHoldre.jpg"
          }
          alt=""
        />
      </div>
      <div className={classes.chatDataContainer}>
        <strong>name</strong>
        <p>{selectedUserInfo.name}</p>
      </div>
      <div className={classes.chatDataContainer}>
        <strong>number</strong>
        <p>{selectedUserInfo.number}</p>
      </div>
    </div>
  );
};

const ChatDetailsBox = () => {
  const { selectedChat } = getAuthState();

  if (selectedChat.isGroupChat) {
    return <Group />;
  }
  return <User />;
};

export default ChatDetailsBox;
