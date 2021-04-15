const fs = require('fs');

// generate n x n maze
function generateMaze(n) {
    const grid = [];
    for (let y = 0; y < n; y++) {
        for(let x = 0; x < n; x++) {
            const cell = new Cell(x, y, this.grid.length, this.ctx);
            this.grid.push(cell);
        }
    }
    this.current = this.grid[0];
    this.current.visited = true;
    const next = this.current.checkNeighbors(this.rows, this.grid);
    if(next) {
        this.removeWalls(this.current, next);
        this.stack.push(next);
        this.current = next;
        next.visited = true;
    } else if(this.stack.length) {
        this.current = this.stack.pop();
    } else {
        clearInterval(this.interval);
    }
}

function removeWalls(current, next) {
    const res = current.index - next.index;
    if(res > 1) {
        current.walls[3] = false;
        next.walls[1] = false;   
    }
    if(res === 1) { 
        current.walls[0] = false;
        next.walls[2] = false;
    }
    if(res < -1) {
        current.walls[1] = false;
        next.walls[3] = false;
    }
    if(res === -1) {
        current.walls[2] = false;
        next.walls[0] = false;
    }
}

function cell(x, y, i, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.index = i;
    this.walls = [true, true, true, true];
    this.visited = false;

    this.checkNeighbors = (rows, grid) => {
        const neighbors = [];
        const top = grid[this.index - rows]; 
        const rgt = (this.index + 1) % rows && grid[this.index + 1];
        const btm = grid[this.index + rows]; 
        const lft = this.index % rows && grid[this.index - 1];
        const { floor, random } = Math;
        if(top && !top.visited) {
            neighbors.push(top);
        }
        if(rgt && !rgt.visited) {
            neighbors.push(rgt);
        }
        if(btm && !btm.visited) {
            neighbors.push(btm);
        }
        if(lft && !lft.visited) {
            neighbors.push(lft);
        }
        const randomIndex = floor(random() * neighbors.length);
        return neighbors[randomIndex] || undefined;
    }
}
