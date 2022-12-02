import React from "react";
import classes from "./home.module.css";
import Button from "../components/ui/Button";
import { useState } from "react";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={classes.authContainer}>
      <h1>baat - Cheet</h1>
      <p>chat as you like no ristrication</p>

      <div className={classes.auth_button_Container}>
        <Button
          onClick={() => {
            setIsLogin(true);
          }}
          className={classes.authButton}
          active={isLogin}
        >
          login
        </Button>
        <Button
          onClick={() => {
            setIsLogin(false);
          }}
          className={classes.authButton}
          active={!isLogin}
        >
          signup
        </Button>
      </div>

      {isLogin && <Login />}
      {!isLogin && <Signup />}
    </div>
  );
};

export default Home;
