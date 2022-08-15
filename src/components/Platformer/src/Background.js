class BackgroundLayer {
    constructor(image, speedModifier, width, height, gameSpeed) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    restart() {
        this.x = 0;
    }
    update(gameSpeed) {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x = 0;
        }
        this.x = this.x - this.speed;
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}
export default BackgroundLayer;
