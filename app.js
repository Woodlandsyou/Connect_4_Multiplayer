const { updateTurn } = require("./game");

const express = require("express");
const app = express();

app.use(express.static("public"));
const server = app.listen("8080");

app.get("/", (req, res) => {
    res.sendFile("./views/index.html", {root: __dirname});
});

const io = require("socket.io")(server, {
    cors: {origin: "*"}
});

io.on("connect", socket => {

    socket.on("turn", x => {
        socket.emit("answer", updateTurn(x));
    });
});