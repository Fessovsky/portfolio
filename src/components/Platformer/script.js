window.addEventListener('load', function () {
    console.log('Game start');
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 700;
    let gameSpeed = 1;
    let enemies = [];
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
        update(gameSpeed) {
            this.speed = this.speed = gameSpeed * this.speedModifier;
            if (this.x <= -this.width) {
                this.x = 0;
            }
            this.x = Math.floor(this.x - this.speed);
        }
        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
    }
    const backgroundLayer1 = new BackgroundLayer(
        document.getElementById('background-bg'),
        1,
        canvas.width,
        canvas.height,
        gameSpeed
    );
    const backgroundLayer2 = new BackgroundLayer(
        document.getElementById('background-far-trees'),
        2,
        canvas.width,
        canvas.height,
        gameSpeed
    );
    const backgroundLayer3 = new BackgroundLayer(
        document.getElementById('background-mid-trees'),
        3,
        canvas.width,
        canvas.height,
        gameSpeed
    );
    const backgroundLayer4 = new BackgroundLayer(
        document.getElementById('background-trees'),
        4,
        canvas.width,
        canvas.height,
        gameSpeed
    );
    class InputHandler {
        constructor() {
            this.keys = [];
            document.addEventListener('keydown', (e) => {
                if (
                    (e.key === 'ArrowDown' ||
                        e.key === 'ArrowUp' ||
                        e.key === 'ArrowLeft' ||
                        e.key === 'ArrowRight') &&
                    this.keys.indexOf(e.key) === -1
                ) {
                    this.keys.push(e.key);
                }
            });
            document.addEventListener('keyup', (e) => {
                if (
                    e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight'
                ) {
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            });
        }
    }
    class Player {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;

            //animation
            this.width = 27;
            this.height = 39;
            this.imageIdle = document.getElementById('player-idle');
            this.imageRun = document.getElementById('player-run');
            this.image = null;
            this.frame = 0;
            this.maxFrame = 3;
            this.animationSpeed = 10;

            // position
            this.x = 0;
            this.y = this.gameHeight - this.height;

            // characteristics
            this.baseSpeed = 3;
            this.speed = 0;
            this.vy = 0;
            this.weight = 1;
        }
        draw(context) {
            context.drawImage(
                this.image,
                0,
                this.frame * this.height,
                this.width,
                this.height,
                this.x,
                this.y,
                this.width,
                this.height
            );
        }

        handleRun() {}

        update(input) {
            this.animationSpeed--;

            if (input.keys.indexOf('ArrowRight') > -1) {
                this.maxFrame = 7;
                this.image = document.getElementById('player-run');
                this.speed = this.baseSpeed;
            } else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.maxFrame = 7;
                this.image = document.getElementById('player-run');
                this.speed = -this.baseSpeed;
            } else if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {
                this.maxFrame = 3;
                this.image = this.imageIdle;
                this.vy -= 18;
            } else if (!this.onGround()) {
                this.frame = 0;
                this.maxFrame = 0;
                this.image = document.getElementById('player-transition to charge');
            } else {
                this.maxFrame = 4;
                this.image = this.imageIdle;
                this.speed = 0;
            }

            // horizontal movement
            this.x += this.speed;
            if (this.x < -50) this.x = -50;
            if (this.x > this.gameWidth - this.width + 50) this.x = this.gameWidth - this.width + 50;

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

            //frame animation
            if (this.frame < this.maxFrame) {
                if (this.animationSpeed === 0) {
                    this.frame++;
                }
            } else {
                this.frame = 0;
            }
            if (this.animationSpeed === 0) {
                this.animationSpeed = 10;
            }
        }
        onGround() {
            return this.y >= this.gameHeight - this.height;
        }
    }

    class Enemy {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.size = Math.random() * 1.5 + 1;
            this.width = 27;
            this.height = 39;
            this.modifiedWidth = this.width * this.size;
            this.modifiedHeight = this.height * this.size;
            this.image = document.getElementById('player-run');
            this.x = this.gameWidth;
            this.y = this.gameHeight - this.modifiedHeight;
            this.frameY = 0;
            this.maxFrame = 7;
            this.fps = 10 / this.size;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;
            this.speed = 1;
            this.setToDelete = false;
        }
        draw(context) {
            context.save();
            context.strokeRect(this.x + this.width, this.y, this.modifiedWidth, this.modifiedHeight);

            context.drawImage(
                this.image,
                0,
                this.frameY * this.height,
                this.width,
                this.height,
                this.x + this.width,
                this.y,
                this.modifiedWidth,
                this.modifiedHeight
            );
            context.restore();
        }
        update(deltaTime) {
            if (this.frameTimer > this.frameInterval) {
                if (this.frameY < this.maxFrame) this.frameY++;
                else this.frameY = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }
            this.counter++;
            this.x -= this.speed;
            if (this.x < 0 - this.modifiedWidth - this.width) this.setToDelete = true;
        }
    }
    function handleEnemies(deltaTime) {
        if (enemyTimer > enemyInterval + randomEnemyInterval) {
            enemies.push(new Enemy(canvas.width, canvas.height));
            randomEnemyInterval = Math.random() * 1000 + 500;
            enemyTimer = 0;
        } else {
            enemyTimer += deltaTime;
        }
        enemies.forEach((enemy) => {
            enemy.draw(ctx);
            enemy.update(deltaTime);
        });
        enemies = enemies.filter((enemy) => !enemy.setToDelete);
    }
    function displayStatus() {}

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);

    let lastTime = 0;
    let enemyTimer = 0;
    let enemyInterval = 1000;
    let randomEnemyInterval = Math.random() * 2000 + 500;

    let backgroundLayers = [backgroundLayer1, backgroundLayer2, backgroundLayer3, backgroundLayer4];

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        [...backgroundLayers].forEach((layer) => {
            layer.draw(ctx);
            // layer.update(gameSpeed);
        });

        player.update(input);
        player.draw(ctx);
        handleEnemies(deltaTime);
        requestAnimationFrame(animate);
    }
    animate(0);
});
