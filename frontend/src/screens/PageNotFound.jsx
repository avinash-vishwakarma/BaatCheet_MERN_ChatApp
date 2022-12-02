import React from "react";
import classes from "./pageNotFound.module.css";
import notFoundSvg from "./assets/svgs/pageNotFoundVerctor.svg";

const PageNotFound = () => {
  return (
    <div className={classes.notFoundContainer}>
      <img src={notFoundSvg} alt="Page Not Found" />
      <p>404 page not found</p>
    </div>
  );
};

export default PageNotFound;
