import React, { useEffect } from "react";
import classes from "./useroptions.module.css";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Model from "../ui/Model";
import useFetch from "../../hooks/useFetch";
import SingleUser from "../ui/SingleUser";
import UserProfilePic from "../ui/UserProfilePic";
import getFirstName from "../../util/getFirstName";
import { getAuthState } from "../../context/authcontext";
import UserBadge from "../ui/userBadge/userBadge";

const UserOptions = ({ show }) => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const searchUserRquest = useFetch();
  const createGroupRequest = useFetch();
  const [groupChatName, setGroupChatName] = useState("");
  const [groupUsers, setGroupUsers] = useState([]);
  const { setChats } = getAuthState();

  const addUserToGroupHandler = (addUser) => {
    setGroupUsers((old) => {
      if (old.some((user) => user._id === addUser._id)) {
        return old;
      }
      return [addUser, ...old];
    });
  };

  const removeFromGroupHandler = (userId) => {
    setGroupUsers((old) => {
      const filteredArray = old.filter((e) => {
        return e._id !== userId;
      });

      return filteredArray;
    });
  };

  const handleSearch = (value) => {
    searchUserRquest.request(`http://localhost:5000/api/user?search=${value}`);
  };

  const createGroupHandler = () => {
    if (groupChatName && groupUsers.length >= 1) {
      createGroupRequest.request("http://localhost:5000/api/chat/group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          users: groupUsers,
          chatName: groupChatName,
        }),
      });
    }
  };

  useEffect(() => {
    if (createGroupRequest.data) {
      //close the model
      setChats((chats) => {
        return [createGroupRequest.data.chat, ...chats];
      });
      setShowCreateGroup(false);
    }
  }, [createGroupRequest.data]);

  return (
    <ul
      className={`${classes.userOptionsContainer} ${
        show && classes.showOptions
      } `}
    >
      <li
        onClick={() => {
          setShowCreateGroup(true);
        }}
      >
        <Icon icon="material-symbols:group" />
        create a group
      </li>
      {showCreateGroup && (
        <Model
          onClose={() => {
            setShowCreateGroup(false);
          }}
        >
          <div className={classes.createNewGroupModel}>
            <h4> create new group</h4>
            <div className={classes.searchUserContainer}>
              <input
                type="text"
                onChange={(e) => setGroupChatName(e.target.value)}
                placeholder="group chat name"
              />
            </div>
            <div className={classes.selectedUsersContainer}>
              {groupUsers.map((user) => {
                return (
                  <UserBadge
                    key={user._id}
                    onClick={removeFromGroupHandler.bind(null, user._id)}
                    name={getFirstName(user.name)}
                  />
                );
              })}
            </div>

            <div className={classes.searchUserContainer}>
              <input
                type="text"
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="search user"
              />
            </div>
            <div className={classes.resutltUserContainer}>
              {searchUserRquest.data &&
                searchUserRquest.data.users.map((user) => {
                  return (
                    <div
                      key={user._id}
                      onClick={addUserToGroupHandler.bind(null, user)}
                      className={classes.serchUserSingle}
                    >
                      <UserProfilePic src={user.pic} />
                      <h4>{user.name}</h4>
                    </div>
                  );
                })}
            </div>
            <button
              className={classes.createChatBtn}
              onClick={createGroupHandler}
            >
              create Group
            </button>
          </div>
        </Model>
      )}
    </ul>
  );
};

export default UserOptions;
