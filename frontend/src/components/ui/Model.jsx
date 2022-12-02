import React from "react";
import classes from "./model.module.css";
import ReactDOM from "react-dom";

const Model = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <>
      <div className={classes.modelBackDrop} onClick={onClose}></div>
      {children}
    </>,
    document.getElementById("model")
  );
};

export default Model;
