class Player {
    constructor(windowWidth, windowHeight) {
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
        this.xPosition = windowWidth / 2;
        this.yPosition = windowHeight / 2;
        this.radius = 3;
        this.turnDirection = 0; // Left and right
        this.walkDirection = 0; // Forward and backward
        this.rotationAngle = Math.PI / 2;
        this.moveSpeed = 3.0;
        this.rotationSpeed = 3 * (Math.PI / 180);
    }

    update() {
        this.rotationAngle += this.turnDirection * this.rotationSpeed;
        
        let moveStep = this.walkDirection * this.moveSpeed;

        let newXPosition = this.xPosition + Math.cos(this.rotationAngle) * moveStep;
        let newYPosition = this.yPosition + Math.sin(this.rotationAngle) * moveStep;

        if (!this.wallCollision(newXPosition, newYPosition)) {
            this.xPosition = newXPosition;
            this.yPosition = newYPosition;
        }
    }

    wallCollision(x, y) {
        // Check for map bounds
        let tileX = Math.floor(x / map.tileSize);
        let tileY = Math.floor(y / map.tileSize);
        return map.grid[tileY][tileX] === 1;
    }

    move() {
        if (keyIsDown(UP_ARROW) === true) {
            player.walkDirection = 1;
        } else if (keyIsDown(UP_ARROW) === false) {
            player.walkDirection = 0;
        }
        // I don't know why this works.
        if (keyIsDown(DOWN_ARROW) === true) {
            player.walkDirection = -1;
        }

        if (keyIsDown(LEFT_ARROW) === true) {
            player.turnDirection = -1;
        } else if (keyIsDown(LEFT_ARROW) === false) {
            player.turnDirection = 0;
        }

        if (keyIsDown(RIGHT_ARROW) === true) {
            player.turnDirection = 1;
        }

        this.update();
    }

    render() {
        fill("red");
        circle(this.xPosition, this.yPosition, this.radius);
        stroke("red");
        line(this.xPosition,
            this.yPosition,
            this.xPosition + Math.cos(this.rotationAngle) * 30,
            this.yPosition + Math.sin(this.rotationAngle) * 30
        );
    }
}