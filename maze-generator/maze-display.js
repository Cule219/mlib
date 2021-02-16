const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = 800;
const height = 800;

canvas.width = width;
canvas.height = height;

class Game {
    constructor(ctx) {
        this.w = 20;
        this.ctx = ctx;
        this.grid = [];
        this.stack = [];
        this.rows = height / this.w;
        this.cols = width / this.w;
    }

    setup() {
        for (let y = 0; y < this.rows; y++) {
            for(let x = 0; x < this.cols; x++) {
                const cell = new Cell(x, y, this.grid.length, this.ctx);
                this.grid.push(cell);
            }
        }
        this.current = this.grid[0];
        this.interval = setInterval(this.draw, 20);
    }
    draw = () => {
        this.ctx.fillStyle = '#111';
        this.ctx.fillRect(0, 0, width, height);
        for(const cell of this.grid) {
            cell.show(this.w);
            this.current.show(this.w, true);
        }
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
            console.log()
        }
        
    }
    
    removeWalls(current, next) {
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
}

class Cell {
    constructor(x, y, i, ctx) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.index = i;
        this.walls = [true, true, true, true];
        this.visited = false;
    }
    show(w, current) {
        const x = this.x * w;
        const y = this.y * w;
        this.ctx.strokeStyle = '#DDD';
        const color = current ? '#A42' : '#96A';
        if (this.walls[0])
            this.drawLine(ctx, x, y, x, y + w);
        if (this.walls[1])
            this.drawLine(ctx, x, y + w, x + w, y + w);
        if (this.walls[2])
            this.drawLine(ctx, x + w, y + w, x + w, y);
        if (this.walls[3])
            this.drawLine(ctx, x + w, y, x, y);
        if(this.visited) {
            this.ctx.fillStyle = color;
            this.ctx.fillRect(x, y, w, w);
        }
    }
    drawLine(ctx, startX, startY, endX, endY) {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke(); 
    }
    checkNeighbors(rows, grid) {
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

const game = new Game(ctx);

game.setup();