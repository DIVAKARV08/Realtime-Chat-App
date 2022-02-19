import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Infobar from "../Infobar/Infobar";
import "./Chat.css";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

let socketio;

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:5001";

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);

    socketio = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socketio.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    // return () => {
    //   socketio.emit("disconnect");
    //   socketio.off();
    // };
  }, [ENDPOINT, window.location.search]);

  useEffect(() => {
    socketio.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socketio.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(message, messages);

  return (
    <div className="outerChatContainer">
      <div className="container">
        <Infobar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          sendMessage={sendMessage}
          setMessage={setMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
