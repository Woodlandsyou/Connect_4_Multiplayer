(async () => {
  const socket = io("http://localhost:8080");
  const roomID = window.location.pathname.split("/").at(-1);

  const res = await fetch(`/api/board/${roomID}`, {
    method: "GET", headers: {
      Authorization: `Bearer ${sessionStorage.getItem("playerID")}`
    }
  });
  if (res.status === 401) throw new Error("Autherization failed");
  let { grid, current } = await res.json(), canvas;
  const playerID = sessionStorage.getItem("playerID"), _width = 700, _height = 600, s = _width / grid.length;
  socket.emit("join-Room", roomID, playerID);

  const game = p => {

    p.setup = () => {
      canvas = p.createCanvas(_width, _height).canvas;
      canvas.addEventListener("click", e => {
        const x = Math.floor(p.mouseX / s);
        socket.emit("turn", playerID, x);
      });
    }

    p.draw = () => {
      p.background(0);
      drawLines();
      displayPlates();
    }

    function drawLines() {
      p.push();
      p.stroke(255);
      for (let i = 0; i < grid.length; i++) {
        p.line(i * s, 0, i * s, _height);
        p.line(0, i * s, _width, i * s);
      }
      p.line(_width, 0, _width, _height);
      p.pop();
    }

    function displayPlates() {
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          p.push();
          if (grid[i][j]) p.fill(255, 240, 0); //Yellow
          else p.fill(155, 0, 0); // Red
          p.circle(i * s + s / 2, _height - j * s - s / 2, s);
          p.pop();
        }
      }
    }
    socket.on("update", (board, player, win) => {
      grid = board;
      current = player;
      document.getElementById("currentPlayer").innerText = (current ? "Yellow" : "Red");
      if (typeof win === "number") {
        setTimeout(() => {
          alert(`Player ${player ? "Yellow" : "Red"} has won`);
        }, 1000);
      }
    });
  }
  new p5(game);
})();
