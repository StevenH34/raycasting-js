// Raycasting Game

// const TILE_SIZE = 32;
// const MAP_NUM_COLS = 10;
// const MAP_NUM_ROWS = 11;

// const WINDOW_WIDTH = MAP_NUM_COLS * TILE_SIZE;
// const WINDOW_HEIGHT = MAP_NUM_ROWS * TILE_SIZE;

// Global variables
let map;
let player;

function setup() {
    map = new Map();
    createCanvas(map.getWindowWidth(), map.getWindowHeight());
    player = new Player(map.getWindowWidth(), map.getWindowHeight());
}

function draw() {
    map.render();
    player.render();
    player.move();
}

// Not sure if this is needed
function update() {
    // player.update();?
}