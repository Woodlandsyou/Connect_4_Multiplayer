const { Game } = require("./Game.js");

const path = require("path");
const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.static("public"));
const server = app.listen(PORT);
console.log(`server listening to Port: ${PORT}`)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
});

const io = require("socket.io")(server, {
    cors: {origin: "*"}
});

let lobbies = new Map();

app.put("/api/lobbies/:roomID", (req, res)=> {
  const {roomID} = req.params;

  if(lobbies.has(roomID)) {
    res.status(409).json({eroor: "Lobby already exists"})
  }


})

io.on("connection", socket => {
});
