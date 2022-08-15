export default class Enemy {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.size = Math.random() * 1.5 + 1;
        this.frameWidth = 27;
        this.frameHeight = 39;
        this.modifiedWidth = this.frameWidth * this.size;
        this.modifiedHeight = this.frameHeight * this.size;

        // frame settings
        this.image = document.getElementById('player-run');
        this.x = this.gameWidth;
        this.y = this.gameHeight - this.modifiedHeight;
        this.frameY = 0;
        this.maxFrame = 7;

        // fps
        this.fps = 10 / this.size;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;

        // properties
        this.speed = 4;
        this.setToDelete = false;
        this.scored = false;
        this.isSkipped = false;
    }
    draw(context) {
        // context.save();
        // context.strokeRect(this.x + this.width, this.y, this.modifiedWidth, this.modifiedHeight);
        // ctx.beginPath();

        // context.arc(
        //     this.x + this.modifiedWidth / 2,
        //     this.y + this.modifiedHeight / 2,
        //     this.modifiedWidth / 2,
        //     0,
        //     Math.PI * 2
        // );
        // ctx.stroke();
        context.drawImage(
            this.image,
            0,
            this.frameY * this.frameHeight,
            this.frameWidth,
            this.frameHeight,
            this.x,
            this.y,
            this.modifiedWidth,
            this.modifiedHeight
        );
        // context.restore();
    }
    update(deltaTime) {
        if (this.frameTimer > this.frameInterval) {
            if (this.frameY < this.maxFrame) this.frameY++;
            else this.frameY = 0;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }

        this.x -= this.speed;
        if (this.x < 0 - this.modifiedWidth - this.frameWidth) {
            this.setToDelete = true;
        }
    }
}
