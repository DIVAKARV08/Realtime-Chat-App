import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { useParams } from 'react-router';
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
  const ENDPOINT = "https://realtime-chat-app-v1.herokuapp.com/";

  const parms=useParams();
  useEffect(() => {
    // const { name, room } = queryString.parse(window.location.search);
    
    socketio = io(ENDPOINT);
    setName(parms.name);
    setRoom(parms.room);

    socketio.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

  }, [ENDPOINT]);

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
