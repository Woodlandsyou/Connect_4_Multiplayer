const cols = 7;
let grid = (() => {
    let a = [];
    for (let i = 0; i < cols; i++) a.push([]);
    return a;
})();
let player = false;

function checkForWin(i) {
    let possibilities = [], count;
    const j = grid[i].length - 1;
    const current = grid[i][j];

    // negative diagonal
    if(checkNeighbour(i - 1, j + 1, current)) {
        possibilities.push({x: -1, y: 1});
    } else if(checkNeighbour(i + 1, j - 1, current)) {
        possibilities.push({x: 1, y: -1});
    }

    // vertical
    if(checkNeighbour(i, j + 1, current)) {
        possibilities.push({x: 0, y: 1});
    } else if(checkNeighbour(i, j - 1, current)) {
        possibilities.push({x: 0, y: -1});
    }

    // positive diagonal
    if(checkNeighbour(i + 1, j + 1, current)) {
        possibilities.push({x: 1, y: 1});
    } else if(checkNeighbour(i - 1, j - 1, current)) {
        possibilities.push({x: -1, y: -1});
    }

    // horizontal
    if(checkNeighbour(i - 1, j, current)) {
        possibilities.push({x: -1, y: 0});
    } else if(checkNeighbour(i + 1, j, current)) {
        possibilities.push({x: 1, y: 0});
    }

    for (let k = 0; k < possibilities.length; k++) {
        count = recurseInDirection(i, j, possibilities[k], current, 0) + recurseInDirection(i, j, {x: possibilities[k].x * -1, y: possibilities[k].y * -1}, current, 0) - 1;
    }

    return count;
}

function checkNeighbour(i, j, current) {
    if(current === undefined) return;
    try{
        return grid[i][j] === current;
    } catch(e){}
    return false;
}

function recurseInDirection(i, j, dir, current, recursionCount) {
    if(!checkNeighbour(i + dir.x, j + dir.y, current)) return 1;
    else if(recursionCount > 2) return 1;

    let count = 0;
    count += recurseInDirection(i + dir.x, j + dir.y, dir, current, recursionCount + 1)
    return count += 1;
}

function updateTurn(x) {
    grid[x].push(player);
    const count = checkForWin(x);
    if(count >= 4) {return `${player ? "Yellow":"Red"} has won`;}
    player = !player;
    return {x: x, player: player};
}

module.exports = { updateTurn }