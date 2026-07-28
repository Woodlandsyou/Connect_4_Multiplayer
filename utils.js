const crypto = require("node:crypto");
function generateRoomID(length = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "";

  for (let i = 0; i < length; i++) {
    id += chars[crypto.randomInt(chars.length)];
  }

  return id;
}

function generatePlayerID(players, lobby = undefined) {
  let playerID;
  do {
    playerID = crypto.randomUUID();
  } while (players.includes(playerID))
  players.push(playerID);
  if (lobby) lobby.players.push(playerID);
  return playerID;
}

module.exports = { generateRoomID, generatePlayerID }
