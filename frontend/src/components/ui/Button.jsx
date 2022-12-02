import React from "react";
import classes from "./button.module.css";

const Button = ({ children, className, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${classes.darkButton}  ${className} ${
        active && classes.activeButton
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
