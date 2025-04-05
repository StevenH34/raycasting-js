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
        this.wasIntersectionVertical = false;
    }

    render() {
        stroke(255, 0, 0);
        line(player.xPosition,  
            player.yPosition,
            this.wallHitX,
            this.wallHitY
        );
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
        let horizontalWallHitX = 0; 
        let horizontalWallHitY = 0;

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

        // Increment the intersection until we hit a wall
        while (nextHorizontalX >= 0 && nextHorizontalX <= map.getWindowWidth() && nextHorizontalY >= 0 && nextHorizontalY <= map.getWindowHeight()) {
            if (map.wallCollision(nextHorizontalX, nextHorizontalY - (this.isRayFacingUp ? 1 : 0))) {
                foundHorizontalWall = true;
                horizontalWallHitX = nextHorizontalX;
                horizontalWallHitY = nextHorizontalY;
                break;
            } else {
                nextHorizontalX += deltaX;
                nextHorizontalY += deltaY;
            }
        }

        ///////////////////////////
        // Vertical intersection //
        ///////////////////////////
        let foundVerticalWall = false;
        let verticalWallHitX = 0; 
        let verticalWallHitY = 0;

        // Find the (x-axis) first vertical grid intersection
        xIntersection = Math.floor(player.xPosition / this.tileSize) * this.tileSize;
        xIntersection += this.isRayFacingRight ? this.tileSize : 0;
        // Find the (y-axis) first vertical grid intersection
        yIntersection = player.yPosition + (xIntersection - player.xPosition) * Math.tan(this.rayAngle);

        // Increment the Delta X and Delta Y
        deltaX = this.tileSize;
        deltaX *= this.isRayFacingLeft ? -1 : 1;

        deltaY = this.tileSize * Math.tan(this.rayAngle);
        deltaY *= this.isRayFacingUp   && deltaY > 0 ? -1 : 1;
        deltaY *= this.isRayFacingDown && deltaY < 0 ? -1 : 1;

        // Find the next horizontal intersection
        let nextVerticalX = xIntersection;
        let nextVerticalY = yIntersection;

        // Increment the intersection until we hit a wall
        while (nextVerticalX >= 0 && nextVerticalX <= map.getWindowWidth() && nextVerticalY >= 0 && nextVerticalY <= map.getWindowHeight()) {
            if (map.wallCollision(nextVerticalX  - (this.isRayFacingLeft ? 1 : 0), nextVerticalY)) {
                foundVerticalWall = true;
                verticalWallHitX = nextVerticalX;
                verticalWallHitY = nextVerticalY;
                break;
            } else {
                nextVerticalX += deltaX;
                nextVerticalY += deltaY;
            }
        }

        // Choose closest intersection with wall
        let horizontalDistance = foundHorizontalWall ? Math.hypot(horizontalWallHitX - player.xPosition, horizontalWallHitY - player.yPosition) : Number.MAX_VALUE;
        let verticalDistance = foundVerticalWall ? Math.hypot(verticalWallHitX - player.xPosition, verticalWallHitY - player.yPosition) : Number.MAX_VALUE;
        
        // Only store the smaller distance
        this.wallHitX = horizontalDistance < verticalDistance ? horizontalWallHitX : verticalWallHitX;
        this.wallHitY = horizontalDistance < verticalDistance ? horizontalWallHitY : verticalWallHitY;
        this.distanceToWall = horizontalDistance < verticalDistance ? horizontalDistance : verticalDistance;
        this.wasIntersectionVertical = verticalDistance < horizontalDistance;
    }
};