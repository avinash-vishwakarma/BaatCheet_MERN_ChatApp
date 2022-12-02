import React from "react";
import { useState } from "react";
import Button from "../ui/Button";
import classes from "./login.module.css";
import { getAuthState } from "../../context/authcontext";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";

const Login = () => {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const { login } = getAuthState();
  const loginRequest = useFetch();

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    // login user
    loginRequest.request("http://localhost:5000/api/", {
      method: "POST",
      body: JSON.stringify({
        user_number: number,
        user_password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    const data = loginRequest.data;
    if (data && data.token && data.user) {
      login(data.token, data.user);
    }
  }, [loginRequest.data]);

  return (
    <form onSubmit={loginSubmitHandler} className={classes.loginForm_Container}>
      {loginRequest.error && (
        <div className={classes.errorBox}> {loginRequest.error.message} </div>
      )}
      <input
        type="text"
        onChange={(e) => {
          setNumber(e.target.value);
        }}
        placeholder="Phone Number"
      />
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Password"
      />
      <Button>Submit</Button>
    </form>
  );
};

export default Login;
