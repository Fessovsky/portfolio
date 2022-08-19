// import React, { useRef, useEffect } from 'react';
/*
export default function useCanvas(canvas, draw, update) {
    const canvasRef = useRef(null);

    
    const draw = (ctx, deltaTime, frameTimer, framePerSecond) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.font = '22px Sans-serif';
        ctx.fillText('Hello world! ' + Math.round(deltaTime), 10, 20);
        // if (deltaTime) {ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        // ctx.fillStyle = '#000000';
        // ctx.beginPath();
        // ctx.arc(0 + 1, 100, 20 * Math.sin(360 * 0.1) ** 2, 0, 2 * Math.PI);
        // ctx.fill()};
    };
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
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = canvas.width;
        canvas.height = canvas.height;
        canvas.style.border = canvas.canvasBorder;

        //* deltaTime
        let lastFrameTime = 0;
        const targetFPS = canvas.fps;
        let frameTimer = 0;
        const framePerSecond = 1000 / targetFPS;
        let animationFrameId;

        const render = (timeStamp) => {
            let deltaTime = timeStamp - lastFrameTime;
            lastFrameTime = timeStamp;

            draw(context, deltaTime, frameTimer, framePerSecond);
            animationFrameId = window.requestAnimationFrame(render);
        };
        render(0);
        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
        // draw(context);
    }, [draw, update]);
    return <canvas ref={canvasRef} {...props} />;
}*/

import { useRef, useEffect } from 'react';

const useCanvas = (draw, gameObjects, options = {}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        //* deltaTime
        const canvas = canvasRef.current;
        const context = canvas.getContext(options.context || '2d');
        let lastFrameTime = 0;
        const targetFPS = options.fps;
        let frameTimer = options.frameTimer;
        const framePerSecond = 1000 / targetFPS;

        let animationFrameId;

        const render = (timeStamp) => {
            let deltaTime = timeStamp - lastFrameTime;
            lastFrameTime = timeStamp;

            draw(context, deltaTime, frameTimer, framePerSecond);
            animationFrameId = window.requestAnimationFrame(render);
        };
        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [draw]);

    return canvasRef;
};

export default useCanvas;
