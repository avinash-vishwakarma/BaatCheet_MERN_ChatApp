import React from "react";
import classes from "./spinner.module.css";

const Spinner = () => {
  return (
    <div className={classes["lds-ring"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
