window.addEventListener('load', function () {
    console.log('Game start');
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const bubbleCounter = 10;
    let bubbles = [];

    const wind = Math.random() * 4 - 2;
    canvas.width = 800;
    canvas.height = 700;
    const generators = ['bubbles', 'newOne', 'third'];
    // switch objects
    class NextFunc {
        constructor(generators) {
            this.generators = generators;
            this.currentFunc = generators[0];
            document.getElementById('next-func').addEventListener('click', () => {
                for (let i = 0; i < this.generators.length; i++) {
                    if (this.generators[i] === this.currentFunc && this.generators.length - 1 > i) {
                        this.currentFunc = this.generators[i + 1];
                        return;
                    } else if (this.generators[i] === this.currentFunc && this.generators.length - 1 === i) {
                        this.currentFunc = this.generators[0];
                        return;
                    }
                }
            });
        }
    }
    const funcButton = new NextFunc(generators);
    class Bubble {
        constructor(canvasWidth, canvasHeight) {
            this.fullWidth = canvasWidth;
            this.fullHeight = canvasHeight;
            this.size = Math.floor(Math.random() * 100 + 1);
            this.width = this.size;
            this.height = this.size;
            this.x = Math.floor(Math.random() * (this.fullWidth - this.width * 2) + this.width);
            this.y = this.fullHeight + this.size;
            this.setToDeletion = false;
            // fps
            this.fps = 50;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;

            this.direction = wind > 0 ? 1 : -1;
            this.currentWindForce = wind;
        }
        draw(context) {
            context.fill = 'black';
            context.beginPath();
            context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width, 0, Math.PI * 2);
            context.stroke();
        }
        update(deltaTime, wind, bubbles, context) {
            if (this.frameTimer > this.frameInterval) {
                this.x += Math.random() * 3 - 1.5 + this.currentWindForce * (this.size / 100);
                this.y += Math.random() * (5 * (this.size / 50)) - 4 * (this.size / 50);

                this.currentWindForce = this.currentWindForce + 0.1 * this.direction;
                if (this.currentWindForce > 10 || this.currentWindForce < -10) {
                    this.direction *= -1;
                }
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }
            if (this.y + this.height / 2 < 0 - this.height) {
                this.setToDeletion = true;
            }
            // context.stroke()
        }
    }
    
    // start bubbles
    let bubbleTimer = 0;
    let bubbleInterval = 250;
    let randomInterval = Math.random() * 250 + 250;

    function handleBubbles(deltaTime) {
        if (bubbleTimer > bubbleInterval + randomInterval) {
            bubbles.push(new Bubble(canvas.width, canvas.height));
            randomInterval = randomInterval = Math.random() * 250 + 250;
            bubbleTimer = 0;
        } else {
            bubbleTimer += deltaTime;
        }
        bubbles = bubbles.filter((bubble) => !bubble.setToDeletion);
    }
    let lastTime = 0;
    for (let i = 0; i < bubbleCounter; i++) {
        bubbles.push(new Bubble(canvas.width, canvas.height));
    }
    // end bubbles
    function animate(timeStamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let deltaTime = timeStamp - lastTime;

        lastTime = timeStamp;
        if (funcButton.currentFunc === 'bubbles') {
            [...bubbles].forEach((bubble) => {
                bubble.draw(ctx);
                bubble.update(deltaTime, wind, bubbles, ctx);
            });
            handleBubbles(deltaTime);
        } else if (funcButton.currentFunc === '') {
        }
        requestAnimationFrame(animate);
    }
    animate(0);
});
