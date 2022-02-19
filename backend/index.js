const App = require("express")();
const server = require("http").createServer(App);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const router = require("./routes");
const { addUser, removeUser, getUsersinRoom, getUser } = require("./users");

const PORT = process.env.PORT || 5001;
App.use(router);

io.on("connection", (socket) => {
  console.log("connected to socket");

  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) {
      return callback(error);
    }
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, Wellcome to ${user.room}`,
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} joined the chat!`,
    });
    socket.join(user.room);

    io
      .to(user.room)
      .emit("roomData", { room: user.room, users: getUsersinRoom(user.room) });
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser({ id: socket.id });
    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser({ id: socket.id });

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left the chat`,
      });
      io.to(user.room).emit("roomData", {
        user: user.room,
        users: getUsersinRoom(user.room),
      });
    }
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
