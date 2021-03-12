// const { start } = require("repl");

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const nextStep = document.querySelector('#solve-step');
const killSolve = document.querySelector('#keel-solve');
const start = document.querySelector('#start');
const solve = document.querySelector('#solve');

const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');

const width = Number(widthInput.value) || 400;
const height = Number(heightInput.value) || 400;

canvas.width = width;
canvas.height = height;

const game = new Game(width, height, ctx);

function generateMaze() {
    game.setup();
}


function startGame() {
    game.solve();
}
// nextStep.onclick = game.solve;
// killSolve.onclick = game.killSolve;

start.onclick = generateMaze;
solve.onclick = startGame;

