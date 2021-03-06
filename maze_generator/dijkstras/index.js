const canvas = document.querySelector('#canvas');
const calculateButton = document.querySelector('calculate');
const traverseButton = document.querySelector('traverse');

class GridDraw {
    constructor(canvas, side, n) {
        canvas.height = side;
        canvas.width = side;
        this.ctx = canvas.getContext('2d');
        this.height = side;
        this.width = side;
        this.n = n;
        this.side = side / n;
    }

    randomIndex = () => Math.ceil(Math.random() * this.n);

    defineStartTarget(startColor, targetColor) {
        // finds 2 radom elements to set as start and target
        const startIndex = this.randomIndex();
        const targetIndex = this.grid.length - this.randomIndex();
        this.start = this.grid[startIndex];
        this.target = this.grid[targetIndex];
        this.target.isTarget = true;
        this.start.color = startColor || 'green';
        this.start.distance = 0;
        this.target.color = targetColor || 'red';
    }

    settup() {
        const generateACell = (_, i) => new Cell(i, 'rgb(255, 255, 255)', i % this.n * this.side + 1, ~~(i / this.n) * this.side + 1, this.side - 2);
        this.grid = Array.from({length: this.n**2}, generateACell);
        this.defineStartTarget();
        this.addNeighbors();
    }

    addNeighbors() {
        this.grid.forEach((cell, i) => {
            const top = this.grid[i - this.n];
            if (top?.rock) top = undefined;
            const btm = this.grid[i + this.n];
            if (btm?.rock) btm = undefined;
            const lft = i % 20 > 0 ? this.grid[i - 1] : undefined;
            if (lft?.rock) lft = undefined;
            const rgt = (i + 1) % 20 ? this.grid[i + 1] : undefined;
            if (rgt?.rock) rgt = undefined;
            cell.neighbors = [top, rgt, btm, lft];
        });
    }

    calculateDistances() {
        const rocks = this.grid.filter(cell => cell.rock);
        console.log('rocks', rocks)
        const stack = [];
        let current = this.start;
        while (current) {
            const distance = current.distance + 10;
            const neighbors = current.neighbors.filter(neighbor => neighbor && neighbor.distance > distance && !neighbor.rock);
            neighbors.forEach(neighbor => neighbor.changeDistance(distance));
            stack.push(...neighbors);
            current = stack.shift();
        }
    }

    draw() {
        this.interval = setInterval(() => {
            this.drawGrid();
        }, 100);
    }

    traverseBack() {
        let current = this.target;
        while(current != this.start) {
            current.color = current !== this.target ? 'yellow' : 'red';
            current = current.neighbors.find((a, v) => v.distance && v.distance < a.distance ? v : a);
            console.log(current);
        }
    }

    drawGrid() {
        for(const cell of this.grid) {
            cell.draw(this.ctx);
        }
 
        for (let i = 0; i <= this.n; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.side, 0);
            this.ctx.lineTo(i * this.side, this.height);
            this.ctx.stroke();
            this.ctx.moveTo(0, i * this.side);
            this.ctx.lineTo(this.height, i * this.side);
            this.ctx.stroke();
        }
    }

    addRocks(n) {
        for (let i = 0; i < n; i++) {
            // gives index between 100 and 300
            const random = 100 + Math.floor(Math.random() * 200);
            const randCell = this.grid[random];
            if (randCell?.rock) {
                i--;
            }
            if (randCell) randCell.rock = true;
        }
    }
}

class Cell {
    constructor(i, color, x, y, side) {
        this.i = i;
        this.distance = Infinity;
        this.color = color;
        this.x = x;
        this.y = y;
        this.side = side;
        this.neighbors = [];
        this.isTarget = false;
        this.rock = false;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.side, this.side)
    }
    changeDistance(distance) {
        this.distance = distance;
        this.color = this.isTarget ? 'red' : `rgb(${255-distance},${255-distance},${255-distance})`;
    }
}


const grid = new GridDraw(canvas, 800, 20);
grid.settup();
// grid.draw();
grid.addRocks(50);
grid.calculateDistances();
grid.traverseBack();
console.log(grid.grid);

grid.drawGrid()