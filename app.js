const { Game } = require("./Game.js");
const { generateRoomID, generatePlayerID } = require("./utils.js")

const path = require("path");
const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.static("public"));
app.use(express.json())
const server = app.listen(PORT);
console.log(`server listening to Port: ${PORT}`)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

const io = require("socket.io")(server, {
  cors: { origin: "*" }
});

let lobbies = new Map();
let players = [];

app.put("/api/create", (req, res) => {

  const roomID = generateRoomID();

  const playerID = generatePlayerID(players);

  lobbies.set(roomID, {
    players: [playerID],
    game: new Game()
  });

  res.status(303).json({
    page: `/lobby/${roomID}/waiting`,
    playerID: playerID
  })

});

app.post("/api/join/:roomID", (req, res) => {
  const { roomID } = req.params;
  if (lobbies.has(roomID) && lobbies.get(roomID).players.length < 2) {
    const playerID = generatePlayerID(players, lobbies.get(roomID));
    res.status(200).json({
      page: `/lobby/${roomID}/waiting`,
      playerID: playerID
    })
  } else {
    res.status(409).json({ error: `Lobby ${roomID} is already full` });
  }
});

app.get("/lobby/:roomID/waiting", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "waiting.html"));
});

app.get("lobby/:roomID", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
})

io.on("connection", socket => {

  socket.on("join-Room", (roomID, playerID) => {
    const lobby = lobbies.get(roomID);
    if (lobby.players.includes(playerID)) {
      socket.join(roomID);
      if (lobby.players.length === 2) io.to(roomID).emit("start", roomID);
    }
  });
});
