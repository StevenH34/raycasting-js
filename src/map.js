class Map {
    constructor() {
        this.tileSize = 32;
        this.darkGrey = "#222";
        this.white = "#fff";
        this.grid = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
    }

    getRows() {
        return this.grid.length;
    }

    getCols() { 
        return this.grid[0].length;
    }

    getWindowWidth() {
        return this.getCols() * this.tileSize;
    }

    getWindowHeight() {
        return this.getRows() * this.tileSize;
    }

    render() {
        let mapRows = this.getRows();
        let mapCols = this.getCols();

        for (let i = 0; i < mapRows; i++) {
            for (let j = 0; j < mapCols; j++) {
                let tileX = j * this.tileSize;
                let tileY = i * this.tileSize;
                let tileColor = this.grid[i][j] === 1 ? this.darkGrey : this.white;
                stroke(this.darkGrey);
                fill(tileColor);
                rect(tileX, tileY, this.tileSize, this.tileSize);
            }
        }
    }
    
    // Check if the player is colliding with a wall
    wallCollision(x, y) {
        let tileX = Math.floor(x / map.tileSize);
        let tileY = Math.floor(y / map.tileSize);
        return map.grid[tileY][tileX] === 1;
    }
}