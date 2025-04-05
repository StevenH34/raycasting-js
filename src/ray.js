class Ray {
    constructor(rayAngle, tileSize) {
        this.rayAngle = this.normalizeAngle(rayAngle);
        this.wallHitX = 0;
        this.wallHitY = 0;
        this.distanceToWall = 0;
        this.tileSize = tileSize;
        this.isRayFacingDown = this.rayAngle > 0 && this.rayAngle < Math.PI;
        this.isRayFacingUp = !this.isRayFacingDown;
        this.isRayFacingRight = this.rayAngle < Math.PI / 2 || this.rayAngle > (3 * Math.PI) / 2;
        this.isRayFacingLeft = !this.isRayFacingRight;
    }

    render() {
        // TODO: Remove this?
        // stroke(255, 0, 0);
        // line(player.xPosition,  
        //     player.yPosition,
        //     player.xPosition + Math.cos(this.rayAngle) * 30,    // X always cos
        //     player.yPosition + Math.sin(this.rayAngle) * 30     // Y always sin
        // );
    }

    normalizeAngle(rayAngle) {
        rayAngle %= (2 * Math.PI); 
        if (rayAngle < 0) { 
            rayAngle += (2 * Math.PI);
        }
        return rayAngle;
    }

    cast(columnId) {
        /////////////////////////////
        // Horizontal intersection //
        /////////////////////////////
        let deltaX, deltaY, xIntersection, yIntersection;
        let foundHorizontalWall = false;
        let wallHitX = 0; 
        let wallHitY = 0;

        // Find the first horizontal intersection
        yIntersection = Math.floor(player.yPosition / this.tileSize) * this.tileSize;   // Ay
        yIntersection += this.isRayFacingDown ? this.tileSize : 0; // Ay + tileSize 

        xIntersection = player.xPosition + (yIntersection - player.yPosition) / Math.tan(this.rayAngle);    // Ax
        

        // Increment the Delta X and Delta Y
        deltaY = this.tileSize;
        deltaY *= this.isRayFacingUp ? -1 : 1;

        deltaX = this.tileSize / Math.tan(this.rayAngle);
        deltaX *= this.isRayFacingLeft  && deltaX > 0 ? -1 : 1;
        deltaX *= this.isRayFacingRight && deltaX < 0 ? -1 : 1;

        // Find the next horizontal intersection
        let nextHorizontalX = xIntersection;
        let nextHorizontalY = yIntersection;

        if (this.isRayFacingUp) {
            // nextHorizontalY -= this.tileSize;
            nextHorizontalY --;
        }

        // Increment the intersection until we hit a wall
        while (nextHorizontalX >= 0 && nextHorizontalX <= map.getWindowWidth() && nextHorizontalY >= 0 && nextHorizontalY <= map.getWindowHeight()) {
            if (map.wallCollision(nextHorizontalX, nextHorizontalY)) {
                // hit wall
                foundHorizontalWall = true;
                wallHitX = nextHorizontalX;
                wallHitY = nextHorizontalY;
                // Hits only horizontal walls
                stroke(0, 255, 0);
                line(player.xPosition, player.yPosition, wallHitX, wallHitY);
                break;
            } else {
                nextHorizontalX += deltaX;
                nextHorizontalY += deltaY;
            }
        }
    }
};