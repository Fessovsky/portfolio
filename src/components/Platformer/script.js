window.addEventListener('load', function () {
    console.log('Game start');
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 700;
    let gameSpeed = 1;
    let enemies = [];
    let score = 0;
    let gameOver = false;
    const backgroundModifiers = {
        layer1: 1,
        layer2: 1.7,
        layer3: 2.3,
        layer4: 3
    };
    const toggleFullscreenButton = document.getElementById('fullscreen-toggle');
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
            // this.x = Math.floor(this.x - this.speed);
            this.x = this.x - this.speed;
        }
        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
    }
    const backgroundLayer1 = new BackgroundLayer(
        document.getElementById('background-bg'),
        backgroundModifiers.layer1,
        canvas.width,
        canvas.height,
        gameSpeed
    );
    const backgroundLayer2 = new BackgroundLayer(
        document.getElementById('background-far-trees'),
        backgroundModifiers.layer2,
        canvas.width,
        canvas.height,
        gameSpeed
    );
    const backgroundLayer3 = new BackgroundLayer(
        document.getElementById('background-mid-trees'),
        backgroundModifiers.layer3,
        canvas.width,
        canvas.height,
        gameSpeed
    );
    const backgroundLayer4 = new BackgroundLayer(
        document.getElementById('background-trees'),
        backgroundModifiers.layer4,
        canvas.width,
        canvas.height,
        gameSpeed
    );
    class InputHandler {
        constructor() {
            this.keys = [];
            this.touchY = '';
            this.touchX = '';
            this.touchThreshold = 30;
            document.addEventListener('keydown', (e) => {
                if (
                    (e.key === 'ArrowDown' ||
                        e.key === 'Escape' ||
                        e.key === 'ArrowUp' ||
                        e.key === 'ArrowLeft' ||
                        e.key === 'ArrowRight') &&
                    this.keys.indexOf(e.key) === -1
                ) {
                    this.keys.push(e.key);
                }
                if ((e.key === 'Escape' || e.code === 'Escape') && gameOver) {
                    handleRestart();
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
            document.getElementById('canvas1').addEventListener('touchstart', (e) => {
                this.touchY = e.changedTouches[0].pageY;
                this.touchX = e.changedTouches[0].pageX;
            });
            document.getElementById('canvas1').addEventListener('touchmove', (e) => {
                const swipeDistanceY = e.changedTouches[0].pageY - this.touchY;
                const swipeDistanceX = e.changedTouches[0].pageX - this.touchX;
                if (swipeDistanceX < -this.touchThreshold && this.keys.indexOf('swipe left') === -1) {
                    this.keys.push('swipe left');
                }
                if (swipeDistanceX > this.touchThreshold && this.keys.indexOf('swipe right') === -1) {
                    this.keys.push('swipe right');
                }
                if (swipeDistanceY < -this.touchThreshold && this.keys.indexOf('swipe up') === -1) {
                    this.keys.push('swipe up');
                }
                if (swipeDistanceY > this.touchThreshold && this.keys.indexOf('swipe down') === -1) {
                    this.keys.push('swipe down');
                    if (gameOver) {
                        handleRestart();
                    }
                }
            });
            document.getElementById('canvas1').addEventListener('touchend', () => {
                this.keys.splice(this.keys.indexOf('swipe up'), 1);
                this.keys.splice(this.keys.indexOf('swipe down'), 1);
                this.keys.splice(this.keys.indexOf('swipe left'), 1);
                this.keys.splice(this.keys.indexOf('swipe right'), 1);
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

        update(input, deltaTime, enemies, context) {
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

    class Enemy {
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
            if (enemy.isSkipped && !enemy.scored) {
                score++;
                enemy.scored = true;
            }
        });
        enemies = enemies.filter((enemy) => !enemy.setToDelete);
    }

    function displayStatus(context) {
        context.textAlign = 'left';
        context.font = '20px Helvetica';
        context.fillStyle = 'black';
        context.fillText('Score: ' + score, 20, 50);
        context.font = '20px Helvetica';
        context.fillStyle = 'white';
        context.fillText('Score: ' + score, 21, 54);
        if (gameOver) {
            context.textAlign = 'center';
            context.fillStyle = 'black';
            context.fillText(
                'GAME OVER, try again... press Escape or swipe down for restart',
                canvas.width / 2 - 2,
                198
            );
            context.fillStyle = 'white';
            context.fillText(
                'GAME OVER, try again... press Escape or swipe down for restart',
                canvas.width / 2,
                200
            );
        }
    }
    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            canvas.requestFullscreen().catch((err) => {
                alert(`Error, can't enable fullscreen mode:${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    toggleFullscreenButton.addEventListener('click', toggleFullScreen);

    function handleRestart() {
        player.restart();
        [...backgroundLayers].forEach((layer) => {
            layer.restart();
        });
        enemies = [];
        gameOver = false;
        score = 0;
        lastTime = 0;
        enemyTimer = 0;
        enemyInterval = 1000;
        randomEnemyInterval = Math.random() * 2000 + 500;
        animate(0);
    }
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
            layer.update(gameSpeed);
        });

        player.update(input, deltaTime, enemies, ctx);
        player.draw(ctx);
        handleEnemies(deltaTime);
        displayStatus(ctx);
        if (!gameOver) requestAnimationFrame(animate);
    }
    animate(0);
});
