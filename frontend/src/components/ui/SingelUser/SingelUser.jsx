import React from "react";
import classes from "./singelUser.module.css";

const SingelUser = ({ name, number, pic, onClick }) => {
  return (
    <div className={classes.singleUserContainer} onClick={onClick}>
      <div className={classes.userPic}>
        <img src={pic ? pic : "./profilePicHoldre.jpg"} alt="" />
      </div>
      <div>
        <h4>{name}</h4>
        <p>{number}</p>
      </div>
    </div>
  );
};

export default SingelUser;
