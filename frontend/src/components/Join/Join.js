import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";
const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <div className="heading">Join</div>
        <div className="InputElements">
          <input
            className="input Name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="input Room"
            type="text"
            placeholder="Enter room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <Link
            onClick={(e) => (!name || !room ? e.preventDefault() : null)}
            to={`/chat?name=${name}&room=${room}`}
            className="joinButton"
          >
            <button className="submitButtom" type="submit">
              Join
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Join;
