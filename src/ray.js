class Ray {
    constructor(rayAngle) {
        this.rayAngle = rayAngle;
    }

    render() {
        stroke(255, 0, 0);
        line(player.xPosition,  
            player.yPosition,
            player.xPosition + Math.cos(this.rayAngle) * 30,    // X always cos
            player.yPosition + Math.sin(this.rayAngle) * 30     // Y always sin
        );
    }

    castRays() {
        // TODO
    }
};