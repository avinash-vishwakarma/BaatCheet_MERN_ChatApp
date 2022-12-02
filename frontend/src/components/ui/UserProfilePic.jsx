import React from "react";
import classes from "./userProfile.module.css";

const UserProfilePic = ({ src, alt }) => {
  return (
    <div className={classes.profileImgeContainer}>
      <img src={src ? src : "profilePicHoldre.jpg"} alt={alt} />
    </div>
  );
};

export default UserProfilePic;
