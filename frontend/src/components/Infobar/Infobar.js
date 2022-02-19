import React from "react";
import "./Infobar.css";

const Infobar = ({ room }) => {
  return (
    <div className="infoBar">
      <div className="leftinnercontainer">
        <h3>{room}</h3>
      </div>

      <div className="rightinnerContainer">
        <a href="/">X</a>
      </div>
    </div>
  );
};

export default Infobar;
