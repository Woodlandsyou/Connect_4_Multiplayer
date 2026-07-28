(() => {
  document.getElementById("lobbyCode").innerText = window.location.pathname.split("/").at(-2);
})()

function copyCode() {
  const code = document.getElementById("lobbyCode").innerText;

  navigator.clipboard.writeText(code);

  const message = document.getElementById("copyMessage");

  message.classList.add("show");

  setTimeout(() => {
    message.classList.remove("show");
  }, 1500);
}


const socket = io("http://localhost:8080");
const playerID = sessionStorage.getItem("playerID");

socket.emit("join-Room", window.location.pathname.split("/").at(-2), playerID);

socket.on("start", roomID => {
  window.location.href = `/lobby/${roomID}`
})
