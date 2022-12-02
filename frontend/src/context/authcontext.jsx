import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useEffect } from "react";

export const authContext = createContext({
  isLogin: false,
  userInfo: null,
  chats: [],
  selectedChat: {},
  setChats() {},
  setSelectedChat() {},
  login() {},
  logout() {},
  setIsLogin() {},
  fetchChats: false,
  setFetchChats() {},
});

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [selectedChat, setSelectedChat] = useState({});
  const [chats, setChats] = useState([]);
  const [fetchChats, setFetchChats] = useState(false);

  useEffect(() => {
    console.log("yes i ran");
    const token = localStorage.getItem("user_token");
    const Info = localStorage.getItem("user_info");
    if (token && Info) {
      setIsLogin(true);
      setUserInfo(JSON.parse(Info));
    }
  }, []);

  const value = {
    isLogin,
    userInfo,
    chats,
    selectedChat,
    fetchChats,
    setFetchChats,
    setChats,
    setSelectedChat,
    login(token, userData) {
      if (token && userData) {
        localStorage.setItem("user_token", token);
        localStorage.setItem("user_info", JSON.stringify(userData));
        setUserInfo(userData);
        setIsLogin(true);
        navigate("/chats", {
          replace: true,
        });
      }
    },
    logout() {
      localStorage.removeItem("user_token");
      localStorage.removeItem("user_info");
      setIsLogin(false);
      navigate("/");
    },
  };

  console.log(value);

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const getAuthState = () => {
  return useContext(authContext);
};
