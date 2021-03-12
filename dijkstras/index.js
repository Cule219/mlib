const canvas = document.querySelector('#canvas');
const button = document.querySelector('button');

class Dijkstras {
    constructor(n) {

    }
}

class GridDraw {
    constructor(canvas, side, n) {
        canvas.height = side;
        canvas.width = side;
        this.ctx = canvas.getContext('2d');
        this.height = side;
        this.width = side;
        this.dijkstras = new Dijkstras();
        this.n = n;
        this.side = side / n;
    }
    settup() {
        const colors = ['yellow', 'red', 'green', 'blue'];
        this.grid = Array.from({length: this.n**2}, (_, i) => new Cell(i, colors[~~(Math.random() * 4)], i % this.n * this.side + 1, ~~(i / this.n) * this.side + 1, this.side - 2));
    }

    draw() {
        this.drawGrid()
    }

    drawGrid() {
        for(const cell of this.grid) {
            console.log(cell)
            cell.draw(this.ctx);
        }
 
        for(let i = 0; i <= this.n; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.side, 0);
            this.ctx.lineTo(i * this.side, this.height);
            this.ctx.stroke();
            this.ctx.moveTo(0, i * this.side);
            this.ctx.lineTo(this.height, i * this.side);
            this.ctx.stroke();
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
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.side, this.side)
    }
}

const grid = new GridDraw(canvas, 800, 20);
grid.settup();
grid.drawGrid();
