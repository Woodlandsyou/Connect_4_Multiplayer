
async function createLobby() {
  const res = await fetch(`/api/create`, { method: "PUT" });
  const { page } = await res.json();
  window.location.href = page;
}

async function joinLobby() {
  const roomID = document.getElementById("lobbyCode").value;
  const res = await fetch(`/api/join/${roomID}`, { method: "POST" })
  const data = await res.json();
  if (typeof data === "string") throw new Error(data);
  const { page, playerID } = data;
  localStorage.setItem("playerID", playerID);
  window.location.href = page;
}
