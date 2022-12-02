import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Button from "../ui/Button";
import classes from "./login.module.css";

const Signup = () => {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const signupRequest = useFetch();

  const signUpSubmitHandler = (e) => {
    e.preventDefault();
    // login user
    const sendingData = JSON.stringify({
      user_name: name,
      user_number: number,
      user_password: password,
      user_confirm_password: confirmPassword,
    });
    signupRequest.request("http://localhost:5000/api/register", {
      method: "POST",
      body: sendingData,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    const data = signupRequest.data;
    if (data && data.token && data.user) {
      login(data.token, data.user);
    }
  }, [signupRequest.data]);

  return (
    <form
      onSubmit={signUpSubmitHandler}
      className={classes.loginForm_Container}
    >
      {signupRequest.error && (
        <div className={classes.errorBox}> {signupRequest.error.message} </div>
      )}
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Name"
      />

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
      <input
        type="password"
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
        placeholder="Confirm Password"
      />
      <Button>Submit</Button>
    </form>
  );
};

export default Signup;
