(() => {
  const game = async p => {

    const socket = io("http://localhost:8080");

    async function getData() {
      return new Promise((resolve) => {
        socket.once("get-Board", resolve);
      });
    }

    let grid, cols, _width, _height, s = _width / cols, canvas, current;
    ({ grid, current } = await getData());

    p.setup = () => {
      canvas = p.createCanvas(_width, _height).canvas;
      canvas.addEventListener("click", e => {
          const x = Math.floor(p.mouseX / s);
          socket.emit("turn", x);
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
            if(grid[i][j]) p.fill(255,240,0);
            else p.fill(155, 0, 0);
            p.circle(i * s + s / 2, _height - j * s - s / 2, s);
            p.pop();
        }
      }
    }
  const p5I = new p5(game);
})();
