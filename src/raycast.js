// Raycasting Engine
// The main file

// TODO: Find horizontal intersections
// TODO: Find vertical intersections 

// TODO: move these somewhere 
let FOV = 60 * (Math.PI / 180); // Field of view in radians
let COL_PIXEL_SIZE = 30; // Width of each column in pixels
let NUM_RAYS;

// Global variables
let map;
let player;
let rays = [];

function setup() {
    map = new Map(); // Not sure which one is better
    NUM_RAYS = map.getWindowWidth() / COL_PIXEL_SIZE;
    createCanvas(map.getWindowWidth(), map.getWindowHeight());
    player = new Player(map.getWindowWidth(), map.getWindowHeight());
}

function castRays() {
    let columnId = 0;
    let rayAngle = player.rotationAngle - (FOV / 2);
    rays = [];

    for (let i = 0; i < NUM_RAYS; i++) {
        let ray = new Ray(rayAngle, map.tileSize);
        ray.cast(columnId);
        rays.push(ray);
        rayAngle += FOV / NUM_RAYS;
        columnId++;
    }
}

function draw() {
    map.render();
    player.move();
    for (ray of rays) {
        ray.render();
    }
    player.render();
    castRays();
}

// What is update() used for?
// The code works without it.
function update() {
    // player.update();
    // castRays();
}