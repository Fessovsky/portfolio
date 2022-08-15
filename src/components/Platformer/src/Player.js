export default class Player {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        //animation
        this.width = 27;
        this.height = 39;
        this.imageIdle = document.getElementById('player-idle');
        this.imageRun = document.getElementById('player-run');
        this.image = null;
        this.frameY = 0;
        this.maxFrame = 3;

        // position
        this.x = 100;
        this.y = this.gameHeight - this.height;

        // fps
        this.fps = 10;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;

        // characteristics
        this.baseSpeed = 3;
        this.speed = 0;
        this.vy = 0;
        this.weight = 1;
    }
    restart() {
        this.x = 100;
        this.y = this.gameHeight - this.height;
        this.frameY = 0;
        this.maxFrame = 3;
        this.frameTimer = 0;
    }
    draw(context) {
        // * circle around
        // ctx.beginPath();
        // context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
        // ctx.stroke();
        context.drawImage(
            this.image,
            0,
            this.frameY * this.height,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    update(input, deltaTime, enemies, context, gameOver) {
        // * collision
        enemies.forEach((enemy) => {
            const dx = enemy.x + enemy.modifiedWidth * 0.4 - (this.x + this.width * 0.4);
            const dy = enemy.y + enemy.modifiedHeight * 0.4 - (this.y + this.height * 0.4);
            const distance = Math.sqrt(dx * dx + dy * dy);
            // context.stroke();
            // context.lineTo(enemy.x + enemy.modifiedWidth / 2, enemy.y + enemy.modifiedHeight / 2);
            // context.lineTo(this.x + this.width / 2, this.y + this.height / 2);
            // context.stroke();
            if (distance < enemy.modifiedWidth * 0.4 + this.width * 0.4) {
                gameOver = true;
            } else if (this.isSkipped(enemy)) {
                enemy.isSkipped = true;
            }
        });
        if (this.frameTimer > this.frameInterval) {
            if (this.frameY < this.maxFrame) {
                this.frameY++;
            } else {
                this.frameY = 0;
            }
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }

        if (input.keys.indexOf('ArrowRight') > -1 || input.keys.indexOf('swipe right') > -1) {
            this.frame = 0;
            this.maxFrame = 7;
            this.image = document.getElementById('player-run');
            this.speed = this.baseSpeed;
        } else if (input.keys.indexOf('ArrowLeft') > -1 || input.keys.indexOf('swipe left') > -1) {
            this.frame = 0;
            this.maxFrame = 7;
            this.image = document.getElementById('player-run');
            this.speed = -this.baseSpeed;
        } else if (
            (input.keys.indexOf('ArrowUp') > -1 || input.keys.indexOf('swipe up') > -1) &&
            this.onGround()
        ) {
            this.maxFrame = 3;
            this.image = this.imageIdle;
            this.vy -= 18;
        } else if (!this.onGround()) {
            this.frame = 1;
            this.maxFrame = 0;
            this.image = document.getElementById('player-transition to charge');
        } else {
            this.maxFrame = 4;
            this.image = this.imageIdle;
            this.speed = 0;
        }
        // swipe control air
        if (
            this.onGround &&
            (input.keys.indexOf('ArrowLeft') > -1 || input.keys.indexOf('swipe left') > -1)
        ) {
            this.speed = -this.baseSpeed;
        }
        if (
            this.onGround &&
            (input.keys.indexOf('ArrowRight') > -1 || input.keys.indexOf('swipe right') > -1)
        ) {
            this.speed = this.baseSpeed;
        }

        // horizontal movement
        this.x += this.speed;

        if (this.x < 10) this.x = 10;
        if (this.x > this.gameWidth - this.width - 10) this.x = this.gameWidth - this.width - 10;

        // vertical movement
        this.y += this.vy;
        if (!this.onGround()) {
            this.vy += this.weight;
        } else {
            this.vy = 0;
        }
        if (this.y > this.gameHeight - this.height) {
            this.y = this.gameHeight - this.height;
        }
    }
    onGround() {
        return this.y >= this.gameHeight - this.height;
    }
    isSkipped(enemy) {
        return enemy.x + enemy.modifiedWidth / 2 < this.x + this.width / 2;
    }
}
