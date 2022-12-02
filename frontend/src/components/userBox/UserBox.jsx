import React from "react";
import classes from "./userBox.module.css";
import { Icon } from "@iconify/react";
import { useState } from "react";
import UserProfilePic from "../ui/UserProfilePic";
import { getAuthState } from "../../context/authcontext";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Spinner from "../ui/Spinner";
import SingleUser from "../ui/SingleUser";
import MyChats from "../myChats/MyChats";
import UserOptions from "../UserOptions/UserOptions";

const UserBox = () => {
  const [searchUser, setSearchUser] = useState("");
  const [showSearchResult, setShowSearchResult] = useState(false);
  const searchUserRequest = useFetch();
  const { userInfo, setSelectedChat, chats, setChats } = getAuthState();
  const accessChatRequest = useFetch();
  const [showOptions, setShowOptions] = useState(false);

  const searchuserHandler = (e) => {
    e.preventDefault();
    if (searchUser.length > 0) {
      setShowSearchResult(true);
      searchUserRequest.request(
        `http://localhost:5000/api/user?search=${searchUser}`
      );
    }
  };

  const accessChatHandler = (userId) => {
    setShowSearchResult(false);
    accessChatRequest.request("http://localhost:5000/api/chat/", {
      method: "POST",
      body: JSON.stringify({
        userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    if (accessChatRequest.data) {
      if (
        !chats.find(
          (element) => element._id === accessChatRequest.data.data._id
        )
      ) {
        setChats((old) => [accessChatRequest.data.data, ...old]);
      }
      setSelectedChat(accessChatRequest.data.data);
    }
  }, [accessChatRequest.data]);

  return (
    <div className={classes.userBox}>
      <div className={classes.loggedUser}>
        <UserProfilePic src={userInfo.pic} />
        <button
          className={classes.useMenuBtn}
          onClick={() => {
            setShowOptions((old) => !old);
          }}
        >
          <Icon icon="bi:three-dots-vertical" />
        </button>
        <UserOptions show={showOptions} />
      </div>

      <form className={classes.userSearchBox} onSubmit={searchuserHandler}>
        <input
          type="text"
          onChange={(e) => setSearchUser(e.target.value)}
          placeholder="Search User"
        />
        <button>
          <Icon icon="ic:baseline-search" />
        </button>
      </form>

      <MyChats />

      <ul
        className={`${classes.searchResultContainer} ${
          showSearchResult && classes.showResult
        }`}
      >
        <button
          className={classes.backSearchBtn}
          onClick={() => {
            setShowSearchResult(false);
          }}
        >
          <Icon icon="material-symbols:arrow-back-rounded" />
        </button>

        {searchUserRequest.isLoading && (
          <div className={classes.lodingContainer}>
            <Spinner />
          </div>
        )}

        {searchUserRequest.data &&
          searchUserRequest.data.users.length === 0 && (
            <p className={classes.noUserFound}>sorry no user found</p>
          )}

        {searchUserRequest.data?.users &&
          searchUserRequest.data.users.map((user) => {
            return (
              <SingleUser
                name={user.name}
                key={user._id}
                pic={user.pic}
                onClick={accessChatHandler.bind(null, user._id)}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default UserBox;
