import ravenImg from '../img/raven.png';
// import boomSound from '../sounds/Ice attack 2.wav';
import boomImage from '../img/boom.png';
// import bg from '../img/background/bg.png';
// import farTrees from '../img/background/far-tree.png';
// import midTrees from '../img/background/layers/mid-trees.png';
// import trees from '../img/background/layers/trees.png';
class Raven {
    constructor(ctx, canvas, difficulty) {
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.sizeModifier = Math.random() * 0.5 + 0.25;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.canvas = canvas;
        this.x = this.canvas.width;
        this.y = Math.random() * (this.canvas.height - this.height);
        this.directionX = Math.random() * 0.1 + (2.1 * difficulty) / 100;
        this.directionY = Math.random() * 5 - 2.5;
        this.ctx = ctx;
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = ravenImg;
        this.frame = 0;
        this.maxFrame = 4;
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 50 + 30;
        this.randomColors = [
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            255
        ];
        this.color =
            'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
    }

    update(deltaTime, handleStatus, score, isGameOver, gameSpeed) {
        if (this.y < 0 || this.y > this.canvas.height - this.height) {
            this.directionY = this.directionY * -1;
        }

        this.x -= this.directionX * gameSpeed;
        this.y += this.directionY;
        if (this.x < 0 - this.width) this.markedForDeletion = true;
        this.timeSinceFlap += deltaTime;
        if (this.timeSinceFlap > this.flapInterval) {
            if (this.frame > this.maxFrame) this.frame = 0;
            else this.frame++;
            this.timeSinceFlap = 0;
        }
        if (this.x < 0 - this.width) {
            handleStatus(score);
            isGameOver.current = true;
        }
    }

    draw(collisionCtx) {
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.drawImage(
            this.image,
            this.frame * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

class Explosion {
    constructor(x, y, size, collisionCanvas) {
        this.image = new Image();
        this.image.src = boomImage;
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.size = size;
        this.y = y;
        this.x = x;
        this.frame = 0;
        // this.sound = new Audio();
        // this.sound.volume = 0.05;
        // this.sound.src = boomSound;
        this.timeSinceLastFrame = 0;
        this.frameInterval = 80;
        this.collisionCanvas = collisionCanvas;
        this.markedForDeletion = false;
    }
    update(deltaTime) {
        // if (this.frame === 0) this.sound.play();
        this.timeSinceLastFrame += deltaTime;
        if (this.timeSinceLastFrame > this.frameInterval) {
            this.timeSinceLastFrame = 0;
            this.frame++;
            if (this.frame > 5) this.markedForDeletion = true;
        }
    }
    draw() {
        this.collisionCanvas.drawImage(
            this.image,
            this.frame * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y - this.size * 0.25,
            this.size,
            this.size
        );
    }
}
// class Background {
//     constructor(gameWidth, gameHeight) {
//         this.gameWidth = gameWidth;
//         this.gameHeight = gameHeight;
//         this.image1 = bg;
//         this.image2 = farTrees;
//         this.image3 = midTrees;
//         this.image4 = trees;
//     }
// }
// class Layer {
//     constructor(game, width, height, speedModifier, image) {
//         this.game = game;
//         this.width = width;
//         this.height= height;
//         this.speedModifier= speedModifier;
//         this.image = image
//     }
//     update(){

//     }
//     draw(){

//     }
// }
export { Raven, Explosion };
