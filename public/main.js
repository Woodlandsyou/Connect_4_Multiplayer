(() => {
    const game = async p => {

        const socket = io("http://localhost:8080");
    
        const cols = 7, rows = cols - 1;
        const _width = 700, _height = 600;
        const s = _width / cols;
        let grid = (() => {
            let a = [];
            for (let i = 0; i < cols; i++) a.push([]);
            return a;
        })();
        let current = false, canvas;
    
        p.setup = () => {
            canvas = p.createCanvas(_width, _height).canvas;
            canvas.addEventListener("click", e => {
                const x = Math.floor(p.mouseX / s);
                // grid[x].push(current);
                // current = !current;
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
        
        await socket.on("answer",({x, current}) => {
            if(x !== undefined && typeof current === "boolean") console.log(x, current);
        });
        
    }
    const p5I = new p5(game);
})();