import { Icon } from "@iconify/react";
import React from "react";
import classes from "./userBadge.module.css";

const UserBadge = ({ name, onClick }) => {
  return (
    <div className={classes.userBadge} onClick={onClick}>
      {name}
      <Icon icon="maki:cross" />
    </div>
  );
};

export default UserBadge;
