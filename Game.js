class Game {
  constructor(startPlayer = 0) {
    this.cols = 7;
    this.grid = Array.from({ length: this.cols }, () => [])
    this.player = startPlayer;
  }

  checkForWin(i) {
    let possibilities = [], count;
    const j = this.grid[i].length - 1;
    const current = this.grid[i][j];

    // negative diagonal
    if (this.checkNeighbour(i - 1, j + 1, current)) {
      possibilities.push({ x: -1, y: 1 });
    } else if (this.checkNeighbour(i + 1, j - 1, current)) {
      possibilities.push({ x: 1, y: -1 });
    }

    // vertical
    if (this.checkNeighbour(i, j + 1, current)) {
      possibilities.push({ x: 0, y: 1 });
    } else if (this.checkNeighbour(i, j - 1, current)) {
      possibilities.push({ x: 0, y: -1 });
    }

    // positive diagonal
    if (this.checkNeighbour(i + 1, j + 1, current)) {
      possibilities.push({ x: 1, y: 1 });
    } else if (this.checkNeighbour(i - 1, j - 1, current)) {
      possibilities.push({ x: -1, y: -1 });
    }

    // horizontal
    if (this.checkNeighbour(i - 1, j, current)) {
      possibilities.push({ x: -1, y: 0 });
    } else if (this.checkNeighbour(i + 1, j, current)) {
      possibilities.push({ x: 1, y: 0 });
    }

    for (let k = 0; k < possibilities.length; k++) {
      count = this.recurseInDirection(i, j, possibilities[k], current, 0) + this.recurseInDirection(i, j, { x: possibilities[k].x * -1, y: possibilities[k].y * -1 }, current, 0) - 1;
    }

    return count;

  }

  recurseInDirection(i, j, dir, current, recursionCount) {
    if (!this.checkNeighbour(i + dir.x, j + dir.y, current)) return 1;
    else if (recursionCount > 2) return 1;

    let count = 0;
    count += this.recurseInDirection(i + dir.x, j + dir.y, dir, current, recursionCount + 1)
    return count += 1;
  }

  update(x) {
    this.grid[x].push(this.player)
    const count = this.checkForWin(x);
    if (count >= 4) { return this.player ? "Red" : "Yellow"; }
    this.player = this.player ? 0 : 1;
    return undefined;
  }

  checkNeighbour(i, j, current) {
    if (current === null) return;
    try {
      return this.grid[i][j] === current;
    } catch (e) { }
    return false;
  }

}

module.exports = { Game } 
